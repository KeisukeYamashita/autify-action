import axios from 'axios'
import {ScheduleApi, Configuration} from './api'
export interface Inputs {
  token: string
  id: number
}

export class Autifyer {
  private schedule: ScheduleApi

  constructor(cfg: Inputs) {
    const instance = axios.create()
    instance.defaults.headers.common['Authorization'] = `Bearer ${cfg.token}`

    const apiConfig = new Configuration({apiKey: cfg.token})
    this.schedule = new ScheduleApi(
      apiConfig,
      'https://app.autify.com/api/v1',
      instance
    )
  }

  async run(id: number): Promise<void> {
    await this.schedule.schedulesIdPost(id)
  }
}

export default {
  Autifyer
}
