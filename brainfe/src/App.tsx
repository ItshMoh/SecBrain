import { Button } from "./components/Button"
import { AddContent } from "./components/Icons/AddContent"
import { Share } from "./components/Icons/Share"
import { Card } from "./components/Card"

function App() {
  return <div>
    <Button variant="primary" text="Add Content" startIcon={<AddContent></AddContent>}></Button>
    <Button variant="secondary" text="share" startIcon={<Share></Share>}></Button>
    <Card></Card>
  </div>
   
}

export default App
