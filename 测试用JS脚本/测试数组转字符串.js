var strs = '1 2 3 4 5 6 7 8'
console.log(strs)
let strs_arr = strs.split(" ");
console.log(strs_arr)
for (let i = 0; i < strs_arr.length; i++) {
    if(strs_arr[i]==='2'){
        console.log(strs_arr[i].replace('2','2'+'3'))
        strs_arr[i]=strs_arr[i].replace('2','2'+'\n')
    }
}
let join = strs_arr.join(' ');
console.log(join)




