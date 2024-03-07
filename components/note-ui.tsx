
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";

class Note {
  id: number;
  content: string;

  static count: number;

  constructor(content: string) {
    this.id = ++Note.count;
    this.content = content;
  }
}

export function NoteUI() {

  const [text, setText] = useState('');

  const handleSubmit = async (event: any) => {
    
    event.preventDefault();

    try {
      const response = await fetch('https://python-notesapi.replit.app/create/note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
  
      if (response.ok) {
        // Handle successful response
        console.log('Text sent successfully');
      } else {
        // Handle error response
        console.error('Failed to send text');
      }
    } catch (error) {
      console.error('Error sending text:', error);
    }
  };

  function createNote() {
    let newNote = new Note('');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex-initial h-14 items-center border-b px-6">
        <h1 className="font-semibold text-lg my-2">Notes</h1>
      </header>
      <div className="flex-1 flex min-h-0 border-b">
        <div className="flex-initial flex flex-col w-[300px] border-r min-h-0">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-initial border-b bg-gray-100/40 py-2 px-4 dark:bg-gray-800/40">
              <Button className="rounded-full" size="icon" variant="ghost">
                <PlusIcon className="h-4 w-4" onClick={createNote()}/>
                <span className="sr-only">New note</span>
              </Button>
              {/* <Button className="rounded-full" size="icon" variant="ghost">
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Delete note</span>
              </Button> */}
            </div>
            <div className="flex-1 overflow-auto py-2">
              <div className="grid gap-1 px-2">
                <Button className="w-full justify-start" variant="ghost">
                  Note 1
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  Note 2
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-initial flex flex-col min-h-0">
            <div className="flex-1 flex flex-col gap-4 min-h-0 p-4">
              <div className="flex-initial">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <Label htmlFor="note-content">Content</Label>
                  <Textarea
                    value={text}
                    className="min-h-[200px] resize-none"
                    id="note-content"
                    placeholder="Enter your note"
                    required
                
                  />
                  <Button type="submit">Save</Button>
                </form>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
