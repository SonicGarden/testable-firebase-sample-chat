import { MessageForm } from "./MessageForm"
import { Messages } from "./Messages"

export const App = () => {
  return (
    <div>
      <h1>Sample Chat App</h1>
      <div>
        <Messages />
        <MessageForm />
      </div>
    </div>
  )
}
