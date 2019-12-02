const exp=require("express");
const app=exp();
const fs=require("fs");
const qs=require("querystring")

app.options("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function readFile() {
 return fs.readFileSync("./employee.json", 'utf8',function(err,result){
        if(err)
        {
            console.log(err);
        }
        else{
            
            return result
        }

    })

}
var response=readFile();
console.log(response)

            app.get('/employee',function (req,res) {
                let respo = JSON.parse(readFile());
                console.log(respo)
                res.json(respo);
                //  let remove = req.query.remove;
                //  if(remove==="salary"){
                //  var result1=respo.map(function(emp)
                //  {
                //     let {salary,...rest} = emp
                //     return rest
                //  });
                //  console.log(result1)
                //  res.json(result1);
                //  }
    })



    // app.get('/employee',function (req,res) {
    //     const response = JSON.parse(readFile());
    //     console.log(response);
    //      let project=req.query.project;
    //      console.log(project);
    //      if(project==="p1")
    //      {
    //      var emp=function(p){
    //      var result3=response.filter(e=>e.project===p)
    //      console.log(result3);
    //      res.json(result3);
    //      }
    //      emp("p1");
    //     }
    //  })  


    app.get('/admin/ctc',function(req,res){
        const resp=JSON.parse(readFile());
        console.log(resp);
        var totalSal=resp.reduce((accumulator,emp)=>accumulator+emp.salary,0)
        console.log(totalSal);
        res.json(totalSal)
    })

    
app.listen(5000,()=>{
    console.log("server is running on port 5000");
})
