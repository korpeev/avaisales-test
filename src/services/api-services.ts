import { Ticket } from './../types/index';
import axios, { AxiosResponse } from 'axios';

export default new (class Api {
  private static baseUrl: string =
    'https://front-test.beta.aviasales.ru/tickets?searchId=1gq2q';

  async fetchData() {
    const response = await axios.get<AxiosResponse<Ticket[]>>(Api.baseUrl);
    return response.data;
  }
})();
