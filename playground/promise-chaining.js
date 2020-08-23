require('../src/db/mongoose');
const User = require('../src/models/user');
const Task =  require('../src/models/task')


// 5e611cd01d58c871f70510e8

// promise chaining example
User.findByIdAndUpdate('5e611cd01d58c871f70510e8',{age:1}).then((user)=>{
    console.log(user);
    return User.countDocuments({age:1})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})

Task.findByIdAndDelete('5e5ff6c56d8f324084faad94').then((task)=>{
    return Task.countDocuments({completed:false})
}).then((result) => {
    console.log(result)
}).catch((e)=>{
    console.log(e)
})
 
// async and await example and data manuplation
const updateAgeAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id,{age});
    const count = await User.countDocuments({age});
    return count
}

updateAgeAndCount('5e611cd01d58c871f70510e8',2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})

const updatetask = async (id)=> {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed:false});
    return count
}

updatetask('5e61194795cffb6f1ceb348d',false).then((count)=>{
    console.log("task uncompleted count" + count)
}).catch((e)=>{
    console.log(e)
})