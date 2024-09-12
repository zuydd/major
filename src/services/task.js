import colors from "colors";
import delayHelper from "../helpers/delay.js";

class TaskService {
  constructor() {}

  removeDuplicatesTask(arr) {
    const seen = new Set();
    return arr.filter((item) => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
  }

  async getDailyTasks(user) {
    try {
      const { data: tasks } = await user.http.get("tasks/?is_daily=true");
      if (tasks) {
        return tasks;
      } else {
        return [];
      }
    } catch (error) {
      return -1;
    }
  }

  async getBasicTasks(user) {
    try {
      const { data: tasks } = await user.http.get("tasks/?is_daily=false");
      if (tasks) {
        return tasks;
      } else {
        return [];
      }
    } catch (error) {
      return -1;
    }
  }

  async getTasks(user) {
    const skipTasks = [];
    const maxRetryGetTask = 10;

    let dailyTasks = await this.getDailyTasks(user);
    let basicTasks = await this.getBasicTasks(user);

    const info = {
      daily: {
        tasks: dailyTasks,
        countError: 0,
      },
      basic: {
        tasks: basicTasks,
        countError: 0,
      },
    };

    while (
      info.daily.tasks === -1 &&
      info.daily.countError <= maxRetryGetTask
    ) {
      info.daily.countError = info.daily.countError + 1;
      info.daily.tasks = await this.getDailyTasks(user);
    }

    while (
      info.basic.tasks === -1 &&
      info.basic.countError <= maxRetryGetTask
    ) {
      info.basic.countError = info.basic.countError + 1;
      info.basic.tasks = await this.getBasicTasks(user);
    }

    if (
      info.daily.countError > maxRetryGetTask ||
      info.basic.countError > maxRetryGetTask
    ) {
      user.log.logError(`Lấy danh sách nhiệm vụ thất bại`);
      return [];
    }

    let tasks = [...info.daily.tasks, ...info.basic.tasks];
    tasks = tasks.filter(
      (task) => !task.is_completed && !skipTasks.includes(task.id)
    );
    return tasks;
  }

  async claimTask(user, task) {
    const body = { task_id: task.id };
    try {
      await delayHelper.delay(1);
      const { data } = await user.http.post("tasks/", body);
      if (data?.is_completed) {
        user.log.log(
          `Làm nhiệm vụ ${colors.blue(
            task?.title
          )} thành công, phần thưởng: ${colors.yellow(
            task?.award + user.currency
          )}`
        );
        return true;
      } else {
        if (user.skipErrorTasks.includes(task.id)) return;
        user.log.logError(
          `Làm thưởng nhiệm vụ ${colors.blue(task?.title)} - ${colors.gray(
            `[${task.id}]`
          )} thất bại do không thể hoàn thành tự động`
        );
        return false;
      }
    } catch (error) {
      if (error.response?.status === 520) {
        return;
      }

      user.log.logError(
        `Làm nhiệm vụ ${colors.blue(task?.title)} - ${colors.gray(
          `[${task.id}]`
        )} thất bại: ${error.response?.status} - ${
          error.response?.data?.detail
        }`
      );
      return -1;
    }
  }

  async handleTask(user) {
    const tasks = await this.getTasks(user);
    let errorTasks = [];

    if (!tasks.length) {
      user.log.log(colors.magenta("Đã làm hết nhiệm vụ"));
      return;
    }

    if (tasks.length) {
      user.log.log(`Còn ${colors.blue(tasks.length)} nhiệm vụ chưa hoàn thành`);
    }

    for (const task of tasks) {
      const status = await this.claimTask(user, task);
      if (status === -1) {
        errorTasks.push(task);
      }
    }

    const maxRetry = 10;
    let countRetry = 0;
    while (errorTasks.length && countRetry <= maxRetry) {
      user.log.log(colors.magenta("Làm lại các nhiệm vụ bị lỗi"));
      const tempError = [];
      for (const task of errorTasks) {
        const status = await this.claimTask(user, task);
        if (status === -1) {
          tempError.push(task);
        }
      }
      countRetry++;
      errorTasks = tempError;
    }

    user.log.log(colors.magenta("Đã làm xong các nhiệm vụ"));
  }
}

const taskService = new TaskService();
export default taskService;
