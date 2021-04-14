import * as core from '@actions/core'
import {Autifyer, Inputs} from './autifyer'
import {inspect} from 'util'

async function run(): Promise<void> {
  try {
    const inputs: Inputs = {
      intervalSeconds: Number(core.getInput('retryIntervalSeconds')) * 1000,
      id: Number(core.getInput('id', {required: true})),
      token: core.getInput('token', {required: true}),
      timeoutSeconds: Number(core.getInput('retryTimeoutSeconds')) * 1000
    }

    // secrets will be masked by GitHub
    core.debug(`Inputs: ${inspect(inputs)}`)

    const autifyer = new Autifyer(inputs)
    await autifyer.run(inputs.id)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
