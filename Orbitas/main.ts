import express , { Request , Response } from 'npm:express';


const app = express()


app.get('/login' ,  (_req : Request  , _res : Response) => {
   _res.send('hello world')
});


app.get('/Register' ,  (_req : Request  , _res : Response) => {
  _res.send('hello world')
});

app.post('/Register' ,  (_req : Request  , _res : Response) => {
  _res.send('hello world')
});


app.get('/logout' ,  (_req : Request  , _res : Response) => {
  _res.send('hello world')
})


app.get('/project' ,  (_req : Request  , _res : Response) => {
  _res.send('hello world')
});

app.post('/project' ,  (_req : Request  , _res : Response) => {
  _res.send('hello world')
});


app.patch('/project' ,  (_req : Request  , _res : Response) => {
  _res.send('hello world')
});


app.get('/profile' ,  (_req : Request  , _res : Response) => {
  _res.send('hello world')
});

app.patch('/profile' ,  (_req : Request  , _res : Response) => {
  _res.send('hello world')
});


app.delete('/profile' ,  (_req : Request  , _res : Response) => {
  _res.send('hello world')
});



app.listen(3000 , () => {
    console.log('Server is renuning on port 3000');
  });



export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}
