class UserController{
    constructor(formId, tableId){
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
    }

    onSubmit(){
        this.formEl.addEventListener('submit', event=>{
            event.preventDefault(); //para o comportamento padrão do evento
            let btn = this.formEl.querySelector('[type=submit]')
            btn.disabled = true 
            let values = this.getValues()
            values.photo = '';
            this.getPhoto().then(
                (content)=>{
                    values.photo = content;
                    this.addLine(values);
                    this.formEl.reset();
                    btn.disabled = false
                }, (e)=>{
                    console.error(e)
            })
            this.getPhoto((content)=>{
                
            });
        });
    }

    getPhoto(){
        return new Promise((resolve, reject)=>{
            let fileReader = new FileReader();  
        let elements = [...this.formEl.elements].filter(item=>{
            if(item.name === 'photo'){
                return item
            }
        })
        let file = elements[0].files[0]
        fileReader.onload = ()=>{
            resolve(fileReader.result)
        } //callback função anônima de retorno
        fileReader.onerror = (e)=>{
            reject(e)
        }
        if(file){
            fileReader.readAsDataURL(file)
        } else{
            resolve('dist/img/boxed-bg.jpg')
        }
        });
    }

    getValues(){
        let user = {};

        [...this.formEl.elements].forEach((field, index)=>{
            if(field.name == 'gender'){
                if(field.checked){
                    user[field.name] = field.value;
                }
        
            } else if(field.name == 'admin'){
                user[field.name] = field.checked;
            } else {
                user[field.name] = field.value;
            }
        });
    
        return new User(
            user.name, user.gender, user.birth, user.country, user.email, user.passaword, user.photo, user.admin);
    }

    addLine(dataUser, tableId){
        //inner recuper ou atribui valor a um elemento html
        let tr = document.createElement('tr')
        tr.innerHTML = ` 
        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin ? 'SIM' : 'NAO'}</td>
        <td>${dataUser.birth}</td>
        <td>
          <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
          <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
      `;
      this.tableEl.appendChild(tr);
    }

};