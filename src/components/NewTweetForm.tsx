import { Button } from "./Button";

export function NewTweetForm() {
  return <form action="" className="flex flex-col border-b px-4 py-2">
    <div className="flex gap-4">
      {/* <ProfileImg src="#url" /> */}
      <textarea 
        className="flex-grow resize-none overflow-hidden text-lg outline-none" 
        placeholder="What's happening?" />
    </div>
    <Button> Tweet </Button>
  </form>
}