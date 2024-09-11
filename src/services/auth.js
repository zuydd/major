import colors from "colors";
import fileHelper from "../helpers/file.js";
import tokenHelper from "../helpers/token.js";

class AuthService {
  constructor() {}

  async login(user, skipLog = false) {
    user.http.updateToken(null);
    const body = {
      init_data: user.query_id,
    };
    try {
      const { data } = await user.http.post("auth/tg/", body);

      if (data?.access_token) {
        return {
          access: data.access_token,
        };
      }
      return null;
    } catch (error) {
      if (!skipLog) {
        user.log.logError(
          `Đăng nhập thất bại: ${error.response?.data?.detail}`
        );
      }
      return null;
    }
  }

  async handleLogin(user) {
    console.log(
      `============== Chạy tài khoản ${user.index} | ${user.info.fullName.green} ==============`
    );

    let token = fileHelper.getTokenById(user.info.id);

    if (token && !tokenHelper.isExpired(token)) {
      const info = {
        access: token,
      };
      const profile = await this.handleAfterLogin(user, info);
      return {
        status: 1,
        profile,
      };
    }

    let infoLogin = await this.login(user);

    if (infoLogin) {
      const profile = await this.handleAfterLogin(user, infoLogin);
      return {
        status: 1,
        profile,
      };
    }
    user.log.logError(
      "Quá trình đăng nhập thất bại, vui lòng kiểm tra lại thông tin tài khoản (có thể cần phải lấy mới query_id). Hệ thống sẽ thử đăng nhập lại sau 60s"
    );
    return {
      status: 0,
      profile: null,
    };
  }

  async getProfile(user) {
    try {
      const { data } = await user.http.get(`users/${user.info.id}/`);
      if (data) {
        return data;
      }
      return null;
    } catch (error) {
      user.log.logError(
        `Lấy thông tin tài khoản thất bại: ${error.response?.data?.detail}`
      );
      return null;
    }
  }

  async handleAfterLogin(user, info) {
    const accessToken = info.access || null;
    user.http.updateToken(accessToken);
    fileHelper.saveToken(user.info.id, accessToken);
    const profile = await this.getProfile(user);
    if (profile) {
      user.log.log(
        colors.green("Đăng nhập thành công: ") +
          `Số điểm: ${
            colors.yellow(Math.round(profile?.rating)) + user.currency
          }`
      );
    }
    return profile;
  }
}

const authService = new AuthService();
export default authService;
