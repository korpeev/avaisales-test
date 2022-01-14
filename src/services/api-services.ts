import axios, { AxiosResponse } from 'axios';
import { Ticket, State } from './../types/index';

export default new (class Api {
  private static baseUrl: string =
    'https://front-test.beta.aviasales.ru/tickets?searchId=';
  private static searchIdUrl: string =
    'https://front-test.beta.aviasales.ru/search';
  async fetchSearchId() {
    const response = await axios.get(Api.searchIdUrl);
    return response.data;
  }
  async fetchData(searchId: string) {
    const response = await axios.get<Pick<State<Ticket>, 'tickets'>>(
      Api.baseUrl + searchId
    );
    return response.data.tickets;
  }
})();
