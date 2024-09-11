import colors from "colors";
import dayjs from "dayjs";
import delayHelper from "../helpers/delay.js";
import generatorHelper from "../helpers/generator.js";

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
        return 10;
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
      user.log.logError(
        `Nhận thưởng chơi game Roulette thất bại: ${error.response?.status} - ${error.response?.data?.detail}`
      );
      return false;
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
        return 10;
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
      user.log.logError(
        `Nhận thưởng chơi game Roulette thất bại: ${error.response?.status} - ${error.response?.data?.detail}`
      );
      return false;
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
        return 10;
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
      user.log.logError(
        `Nhận thưởng chơi game Swipe Coin thất bại: ${error.response?.status} - ${error.response?.data?.detail}`
      );
      return false;
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

    return countdown;
  }
}

const gameService = new GameService();
export default gameService;
