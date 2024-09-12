import colors from "colors";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import delayHelper from "../helpers/delay.js";
import generatorHelper from "../helpers/generator.js";
dayjs.extend(utc);

class GameService {
  constructor() {}

  async startGameHoldCoin(user) {
    try {
      const { data } = await user.http.get("bonuses/coins/");
      if (data?.success) {
        user.log.log(
          `Bắt đầu chơi game Hold Coin, nhận thưởng sau: ${colors.blue(
            "60 giây"
          )}`
        );
        return -1;
      } else {
        return 10;
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.detail) {
        const until =
          Math.floor(error.response?.data?.detail.blocked_until) * 1000;

        const diffTime = dayjs(until).diff(dayjs(), "minutes");
        user.log.log(
          `Đã hết lượt chơi game Hold Coin, chờ lượt mới sau: ${colors.blue(
            diffTime + ` phút`
          )}`
        );
        return diffTime;
      } else {
        user.log.logError(
          `Chơi game Hold Coin thất bại: ${error.response?.status} - ${error.response?.data?.detail}`
        );
        return error.response?.status === 520 ? -1 : 10;
      }
    }
  }

  async claimGameHoldCoin(user) {
    const coins = generatorHelper.randomInt(850, 900);
    const body = { coins };
    try {
      const { data } = await user.http.post("bonuses/coins/", body);
      if (data.success) {
        user.log.log(
          `Chơi game Hold Coin thành công, phần thưởng: ${colors.yellow(
            coins + user.currency
          )}, chờ lượt mới sau ${colors.blue(`480 phút`)}`
        );
        return true;
      } else {
        throw new Error(`Chơi game Roulette thất bại`);
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.detail) {
        const until =
          Math.floor(error.response?.data?.detail.blocked_until) * 1000;

        const diffTime = dayjs(until).diff(dayjs(), "minutes");
        user.log.log(
          `Đã hết lượt chơi game Hold Coin, chờ lượt mới sau: ${colors.blue(
            diffTime + ` phút`
          )}`
        );
        return diffTime;
      } else {
        user.log.logError(
          `Nhận thưởng chơi game Roulette thất bại: ${error.response?.status} - ${error.response?.data?.detail}`
        );
        return false;
      }
    }
  }

  async startGameRoulette(user) {
    try {
      const { data } = await user.http.get("roulette/");
      if (data?.success) {
        user.log.log(
          `Bắt đầu chơi game Roulette, nhận thưởng sau: ${colors.blue(
            "5 giây"
          )}`
        );
        return -1;
      } else {
        return 10;
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.detail) {
        const until =
          Math.floor(error.response?.data?.detail.blocked_until) * 1000;

        const diffTime = dayjs(until).diff(dayjs(), "minutes");
        user.log.log(
          `Đã hết lượt chơi game Roulette, chờ lượt mới sau: ${colors.blue(
            diffTime + ` phút`
          )}`
        );
        return diffTime;
      } else {
        user.log.logError(
          `Chơi game Roulette thất bại: ${error.response?.status} - ${error.response?.data?.detail}`
        );
        return error.response?.status === 520 ? -1 : 10;
      }
    }
  }

  async claimGameRoulette(user) {
    try {
      const { data } = await user.http.post("roulette/", {});
      if (data?.rating_award) {
        user.log.log(
          `Chơi game Roulette thành công, phần thưởng: ${colors.yellow(
            data.rating_award + user.currency
          )}, chờ lượt mới sau ${colors.blue(`480 phút`)}`
        );
        return true;
      } else {
        throw new Error(`Chơi game Roulette thất bại`);
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.detail) {
        const until =
          Math.floor(error.response?.data?.detail.blocked_until) * 1000;

        const diffTime = dayjs(until).diff(dayjs(), "minutes");
        user.log.log(
          `Đã hết lượt chơi game Roulette, chờ lượt mới sau: ${colors.blue(
            diffTime + ` phút`
          )}`
        );
        return diffTime;
      } else {
        user.log.logError(
          `Nhận thưởng chơi game Roulette thất bại: ${error.response?.status} - ${error.response?.data?.detail}`
        );
        return false;
      }
    }
  }

  async startGameSwipeCoin(user) {
    try {
      const { data } = await user.http.get("swipe_coin/");
      if (data?.success) {
        user.log.log(
          `Bắt đầu chơi game Swipe Coin, nhận thưởng sau: ${colors.blue(
            "60 giây"
          )}`
        );
        return -1;
      } else {
        return 10;
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.detail) {
        const until =
          Math.floor(error.response?.data?.detail.blocked_until) * 1000;

        const diffTime = dayjs(until).diff(dayjs(), "minutes");
        user.log.log(
          `Đã hết lượt chơi game Swipe Coin, chờ lượt mới sau: ${colors.blue(
            diffTime + ` phút`
          )}`
        );
        return diffTime;
      } else {
        user.log.logError(
          `Chơi game Swipe Coin thất bại: ${error.response?.status} - ${error.response?.data?.detail}`
        );
        return error.response?.status === 520 ? -1 : 10;
      }
    }
  }

  async claimGameSwipeCoin(user) {
    const coins = generatorHelper.randomInt(2850, 2950);
    const body = { coins };
    try {
      const { data } = await user.http.post("swipe_coin/", body);
      if (data?.success) {
        user.log.log(
          `Chơi game Swipe Coin thành công, phần thưởng: ${colors.yellow(
            coins + user.currency
          )}, chờ lượt mới sau ${colors.blue(`480 phút`)}`
        );
        return true;
      } else {
        throw new Error(`Chơi game Swipe Coin thất bại`);
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.detail) {
        const until =
          Math.floor(error.response?.data?.detail.blocked_until) * 1000;

        const diffTime = dayjs(until).diff(dayjs(), "minutes");
        user.log.log(
          `Đã hết lượt chơi game Swipe Coin, chờ lượt mới sau: ${colors.blue(
            diffTime + ` phút`
          )}`
        );
        return diffTime;
      } else {
        user.log.logError(
          `Nhận thưởng chơi game Swipe Coin thất bại: ${error.response?.status} - ${error.response?.data?.detail}`
        );
        return false;
      }
    }
  }

  async startGameDurov(user) {
    try {
      const { data } = await user.http.get("durov/");
      if (data?.success) {
        user.log.log(
          `Bắt đầu chơi game Durov, nhận thưởng sau: ${colors.blue("5 giây")}`
        );
        return -1;
      } else {
        return 10;
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.detail) {
        const until =
          Math.floor(error.response?.data?.detail.blocked_until) * 1000;

        const diffTime = dayjs(until).add(2, "hour").diff(dayjs(), "minutes");
        user.log.log(
          `Đã hết lượt chơi game Durov, chờ lượt mới sau: ${colors.blue(
            diffTime + ` phút`
          )}`
        );
        return diffTime;
      } else {
        user.log.logError(
          `Chơi game Durov thất bại: ${error.response?.status} - ${error.response?.data?.detail}`
        );
        return error.response?.status === 520 ? -1 : 10;
      }
    }
  }

  async claimGameDurov(user) {
    const answer = user.durov.answer;
    const body = {
      choice_1: answer[0],
      choice_2: answer[1],
      choice_3: answer[2],
      choice_4: answer[3],
    };

    try {
      const { data } = await user.http.post("durov/", body);
      if (data?.correct) {
        const tomorrowMidnightUtc = dayjs
          .utc()
          .add(1, "day")
          .startOf("day")
          .add(2, "hour");
        const nowUtc = dayjs.utc();
        const minutesDifference = tomorrowMidnightUtc.diff(nowUtc, "minute");
        user.log.log(
          `Chơi game Durov thành công, phần thưởng: ${colors.yellow(
            "5000" + user.currency
          )}, chờ lượt mới sau ${colors.blue(`${minutesDifference} phút`)}`
        );
        return {
          status: true,
          diff: minutesDifference,
        };
      } else {
        throw new Error(`Chơi game Durov thất bại`);
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.detail) {
        const until =
          Math.floor(error.response?.data?.detail.blocked_until) * 1000;

        const diffTime = dayjs(until).add(2, "hour").diff(dayjs(), "minutes");
        user.log.log(
          `Đã hết lượt chơi game Durov, chờ lượt mới sau: ${colors.blue(
            diffTime + ` phút`
          )}`
        );
        return diffTime;
      } else {
        user.log.logError(
          `Nhận thưởng chơi game Durov thất bại: ${error.response?.status} - ${error.response?.data?.detail}`
        );
        return false;
      }
    }
  }

  async handleGame(user) {
    let countdown = 480;

    // Hold Coin
    const infoGameHoldCoin = await this.startGameHoldCoin(user);
    if (infoGameHoldCoin === -1) {
      await delayHelper.delay(65);
      const status = await this.claimGameHoldCoin(user);
      if (status) {
        if (countdown > 480) {
          countdown = 480;
        }
      } else {
        countdown = 10;
      }
    } else if (infoGameHoldCoin < countdown) {
      countdown = infoGameHoldCoin;
    }

    // Roulette
    const infoGameRoulette = await this.startGameRoulette(user);
    if (infoGameRoulette === -1) {
      await delayHelper.delay(5);
      const status = await this.claimGameRoulette(user);
      if (status) {
        if (countdown > 480) {
          countdown = 480;
        }
      } else {
        countdown = 10;
      }
    } else if (infoGameRoulette < countdown) {
      countdown = infoGameRoulette;
    }

    // Swipe Coin
    const infoGameSwipeCoin = await this.startGameSwipeCoin(user);
    if (infoGameSwipeCoin === -1) {
      await delayHelper.delay(65);
      const status = await this.claimGameSwipeCoin(user);
      if (status) {
        if (countdown > 480) {
          countdown = 480;
        }
      } else {
        countdown = 10;
      }
    } else if (infoGameSwipeCoin < countdown) {
      countdown = infoGameSwipeCoin;
    }

    // Durov
    const nowUtc = dayjs.utc();
    const dayUtc = nowUtc.format("DD-MM-YYYY");
    if (dayUtc === user?.durov?.day) {
      const infoGameDurov = await this.startGameDurov(user);
      if (infoGameDurov === -1) {
        await delayHelper.delay(5);
        const infoClaim = await this.claimGameDurov(user);
        if (infoClaim?.status) {
          if (countdown > infoClaim.diff) {
            countdown = infoClaim.diff;
          }
        } else {
          countdown = 10;
        }
      } else if (infoGameDurov < countdown) {
        countdown = infoGameDurov;
      }
    } else if (20 < countdown) {
      user.log.log(
        colors.yellow(
          "Chưa có combo Durov, liên hệ chủ tool @zuydd để yêu cầu update"
        )
      );
      countdown = 20;
    }
    return countdown;
  }
}

const gameService = new GameService();
export default gameService;
