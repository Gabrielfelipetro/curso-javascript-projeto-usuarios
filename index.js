let gender = document.querySelectorAll('#form-user-create [name=gender]:checked');
let user = {};

let field = document.querySelectorAll('#form-user-create [name]');

field.forEach((field, index)=>{
    if(field.name == 'gender'){
        if(field.checked){
            user[field.name] = field.value;
        }

    } else {
        user[field.name] = field.value;
    }
});

console.log(user)