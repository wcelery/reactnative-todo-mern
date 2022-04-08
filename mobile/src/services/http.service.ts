import Constants from "expo-constants";

export class HttpService {
  constructor(
    private baseUrl = Constants.manifest?.extra?.SERVER_URL,
    private fetchingService = fetch,
    private apiVer = "api"
  ) {}

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}/${this.apiVer}/${url}`;
  }

  private populateRequestWithBody(data: any) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  }

  private extractUrlAndDataFromConfig({ data, url, ...configWithoutDataAndUrl }: any) {
    return configWithoutDataAndUrl;
  }

  protected async get(config: { url: string }, withAuth = true) {
    const response = await this.fetchingService(this.getFullApiUrl(config.url));

    if (!response.ok) {
      throw new Error("Network error");
    }

    return response.json();
  }

  protected async post(config: { url: string; body: object }, withAuth = true) {
    const response = await this.fetchingService(
      this.getFullApiUrl(config.url),
      this.populateRequestWithBody(config.body)
    );

    return response.json();
  }

  protected async delete(config: { url: string }, withAuth = true) {
    const response = await this.fetchingService(this.getFullApiUrl(config.url), {
      method: "DELETE",
    });

    return response.status;
  }
}
