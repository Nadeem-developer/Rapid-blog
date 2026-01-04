import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', 'views');
var post_count = 4;
var blog = [{title:"The Rise of AI Code Assistants",content:"Artificial intelligence is revolutionizing software development through intelligent code completion and generation tools. GitHub Copilot, ChatGPT, and similar platforms now help developers write code faster, debug efficiently, and learn new programming languages. These AI assistants analyze billions of lines of code to suggest contextually relevant snippets, reducing repetitive tasks and allowing programmers to focus on creative problem-solving. While concerns about code quality and over-reliance persist, AI-powered coding tools are becoming essential companions in modern development workflows, democratizing programming and accelerating innovation across the tech industry.",post_count:1},{title:`Why Every Developer Should Learn Docker`,content:`Docker has transformed application deployment by packaging software into portable containers. Unlike traditional virtual machines, containers share the host OS kernel, making them lightweight and fast. Developers can ensure consistency across development, testing, and production environments, eliminating the "it works on my machine" problem. Docker simplifies microservices architecture, scales applications effortlessly, and integrates seamlessly with CI/CD pipelines. Whether you're building web apps, APIs, or complex distributed systems, containerization skills are now essential. Learning Docker opens doors to modern DevOps practices and cloud-native development opportunities.`,post_count:2},{title:`Understanding JavaScript Closures Simply`,content:`Closures are a fundamental concept in JavaScript that often confuses beginners. Simply put, a closure is a function that remembers variables from its outer scope even after that scope has finished executing. This powerful feature enables data encapsulation, callback functions, and event handlers. Closures are everywhere in modern JavaScript frameworks like React and Vue. They allow you to create private variables, implement factory functions, and maintain state in functional programming. Mastering closures unlocks advanced patterns like currying, memoization, and module design, making you a more proficient JavaScript developer.`,post_count:3},{title:`The Future of Web Development: WebAssembly`,content:`WebAssembly (Wasm) is revolutionizing browser performance by allowing languages like C++, Rust, and Go to run at near-native speeds on the web. Unlike JavaScript, Wasm is a low-level bytecode format that executes efficiently in modern browsers. This technology enables demanding applications—3D games, video editing tools, and scientific simulations—to run smoothly in browsers without plugins. Major companies are adopting Wasm for performance-critical features. As the ecosystem matures with better tooling and language support, WebAssembly promises to expand what's possible on the web while complementing JavaScript rather than replacing it.`,post_count:4}];
// nave bar navigation
app.get("/", (req, res) => {
  res.render("index.ejs", { blog_ejs: blog });
});
app.get("/ADD", (req, res) => {
  res.render("ADD.ejs");
});
app.get("/delete", (req, res) => {
    if(blog.length===0){
        return res.redirect("/");
    }
  res.render("delete.ejs", { blog_ejs: blog });
});
app.post("/delete", (req, res) => {
  const num = parseInt(req.body.delete_number);
  blog = blog.filter((b) => b.post_count !== num); //this line of code is to delete the array with the space
  for (let i = 0; i < blog.length; i++) {
    blog[i].post_count = i + 1;
  }
  post_count = blog.length;
  res.redirect("/");
});
app.get("/edit", (req, res) => {
  res.render("edit.ejs",{blog_ejs:blog});
});
app.post("/edit",(req,res)=>{
  const editNUM=parseInt(req.body.edit_postNumber);
  const editBlog=blog[editNUM-1];
  res.render("edit.ejs",{editBlog:editBlog,blog_ejs:blog});

})
app.post("/editDone",(req,res)=>{
  const x=req.body.edit_postNumber;
  const newTitle=req.body.title;
  let newContent=req.body.content;
  newContent = newContent.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  blog[x-1].title=newTitle;
  blog[x-1].content=newContent;
  res.redirect("/");
})
app.get("/BLOG", (req, res) => {
  // console.log(req.query);
  const postNum = parseInt(req.query.num);
  // console.log(postNum);
  res.render("blog.ejs", { blog: blog[postNum - 1] });
});
// add
app.post("/ADD", (req, res) => {
  post_count++;
  let text = req.body.content;
  text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  blog.push({
    title: req.body.title,
    content: req.body.content,
    post_count,
  });
  // console.log(blog);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
