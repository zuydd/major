import colors from "colors";

class DailyService {
  constructor() {}

  async getDataCheckin(user) {
    try {
      const { data } = await user.http.get("user-visits/streak/");
      if (data) {
        return data;
      }
    } catch (error) {
      return null;
    }
  }

  async checkin(user) {
    // const dataCheckin = await this.getDataCheckin(user);
    try {
      const { data } = await user.http.post("user-visits/visit/", {});
      if (data?.is_increased) {
        user.log.log(colors.green(`Checkin thành công`));
      } else {
        user.log.log(colors.magenta("Đã checkin hôm nay"));
      }
    } catch (error) {
      user.log.logError(`Checkin thất bại: ${error.response?.data?.detail}`);
      return null;
    }
  }
}

const dailyService = new DailyService();
export default dailyService;
