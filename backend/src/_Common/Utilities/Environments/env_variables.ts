class EnvironmentVariables {
  public env = process.env.NODE_ENV || process.env.ENVIRONMENT || "production";

  get isDev(): boolean {
    return !this.isProd;
  }
  get isProd(): boolean {
    return this.env === "production" || this.env === "Prod";
  }

  get LoggerDebugLevel(): string {
    return process.env.LoggerDebugLevel || "debug";
  }

  get IS_OFFLINE(): boolean {
    return (
      process.env.IS_OFFLINE === "true" || process.env.ENVIRONMENT === "Local"
    );
  }

  get morganConfig(): string {
    return this.isProd ? "tiny" : "combined";
  }
}

export default new EnvironmentVariables();
