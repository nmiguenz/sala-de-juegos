"use strict";(self.webpackChunksala_de_juegos=self.webpackChunksala_de_juegos||[]).push([[354],{354:(P,d,i)=>{i.r(d),i.d(d,{IngresoModule:()=>_});var a=i(4363),h=i(8583),u=i(8239),n=i(665),p=i(7129),o=i(3018),m=i(6893),b=i(9344),f=i(1125);const x=function(){return["/ingreso/login"]};let Z=(()=>{class e{constructor(t,r,l,s){this.authService=t,this.route=r,this.toastr=l,this.jugadorSrv=s,this.user=new p.n,this.registerForm=new n.cw({email:new n.NI(""),password:new n.NI(""),cpassword:new n.NI("")})}ngOnInit(){}onRegister(){var t=this;return(0,u.Z)(function*(){t.user=t.registerForm.value;try{t.user.password===t.user.cpassword&&(yield t.authService.register(t.user).then(()=>{t.toastr.success("El usuario se creo con \xe9xito","Nuevo usuario",{timeOut:3e3,positionClass:"toast-bottom-right"}),t.authService.isLoggedIn().subscribe(r=>{if(r){let l;t.user.iduser=r.uid,l=t.logIngreso(t.user.iduser),t.jugadorSrv.alta(t.jugador,"logsLoginRegister")}else t.user.iduser=""}),t.route.navigate([""])}))}catch(r){t.toastr.error("El usuario se creo con \xe9xito","Nuevo usuario",{timeOut:3e3,positionClass:"toast-bottom-right"}),console.log(r)}})()}logIngreso(t){return this.jugador={iduser:t,email:this.registerForm.value.email,fechaIngreso:new Date}}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(m.e),o.Y36(a.F0),o.Y36(b._W),o.Y36(f.w))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-register"]],decls:35,vars:3,consts:[[1,"container-register"],[1,"row","register-row"],[1,"col-lg-3","col-md-2"],[1,"col-lg-6","col-md-8","login-box"],[1,"col-lg-12","login-key"],["aria-hidden","true",1,"fa","fa-users"],[1,"col-lg-12","login-title"],[1,"col-lg-12","login-form"],[3,"formGroup","ngSubmit"],[1,"form-group"],["for","InputEmail",1,"form-control-label"],["type","email","formControlName","email","id","InputEmail","aria-describedby","emailHelp","placeholder","Ingrese su email",1,"form-control"],["for","InputPassword",1,"form-control-label"],["type","password","formControlName","password","id","InputPassword","placeholder","Password",1,"form-control"],["for","InputPassword2",1,"form-control-label"],["type","password","formControlName","cpassword","id","InputPassword2","placeholder","Repetir Password",1,"form-control"],[1,"col-lg-12","loginbttm"],[1,"col-lg-6","login-btm","login-text"],[1,"row","login-button","d-grid","gap-2"],["type","submit",1,"btn","btn-outline-primary"],[1,"form-group","mt-3"],[1,"text-center"],[3,"routerLink"]],template:function(t,r){1&t&&(o.TgZ(0,"div",0),o.TgZ(1,"div",1),o._UZ(2,"div",2),o.TgZ(3,"div",3),o.TgZ(4,"div",4),o._UZ(5,"i",5),o.qZA(),o.TgZ(6,"div",6),o._uU(7," REGISTRO "),o.qZA(),o.TgZ(8,"div",7),o.TgZ(9,"div",7),o.TgZ(10,"form",8),o.NdJ("ngSubmit",function(){return r.onRegister()}),o.TgZ(11,"div",9),o.TgZ(12,"label",10),o._uU(13,"EMAIL"),o.qZA(),o._UZ(14,"input",11),o.qZA(),o.TgZ(15,"div",9),o.TgZ(16,"label",12),o._uU(17,"PASSWORD"),o.qZA(),o._UZ(18,"input",13),o.qZA(),o.TgZ(19,"div",9),o.TgZ(20,"label",14),o._uU(21,"REPETIR PASSWORD"),o.qZA(),o._UZ(22,"input",15),o.qZA(),o.TgZ(23,"div",16),o._UZ(24,"div",17),o.TgZ(25,"div",18),o.TgZ(26,"button",19),o._uU(27,"REGISTRO"),o.qZA(),o.qZA(),o.qZA(),o.TgZ(28,"div",20),o.TgZ(29,"p",21),o._uU(30,"Volver al "),o.TgZ(31,"span"),o.TgZ(32,"a",22),o._uU(33,"Login"),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o._UZ(34,"div",2),o.qZA(),o.qZA(),o.qZA()),2&t&&(o.xp6(10),o.Q6J("formGroup",r.registerForm),o.xp6(22),o.Q6J("routerLink",o.DdM(2,x)))},directives:[n._Y,n.JL,n.sg,n.Fj,n.JJ,n.u,a.yS],styles:['.register-row[_ngcontent-%COMP%]{height:100vh!important}.container-register[_ngcontent-%COMP%]{background-color:#222d32!important;font-family:"Roboto",sans-serif}.login-box[_ngcontent-%COMP%]{margin-top:2rem;height:80vh;background:#1A2226;text-align:center;box-shadow:0 3px 6px #00000029,0 3px 6px #0000003b}.login-key[_ngcontent-%COMP%]{height:100px;font-size:80px;line-height:100px;background:-webkit-linear-gradient(#27EF9F,#0DB8DE);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.login-title[_ngcontent-%COMP%]{text-align:center;font-size:30px;letter-spacing:2px;margin-top:15px;font-weight:bold;color:#ecf0f5}.login-form[_ngcontent-%COMP%]{margin-top:25px;text-align:left}input[type=email][_ngcontent-%COMP%]{background-color:#1a2226;border:none;border-bottom:2px solid #0DB8DE;border-top:0px;border-radius:0;font-weight:bold;outline:0;margin-bottom:20px;padding-left:0;color:#ecf0f5}input[type=password][_ngcontent-%COMP%]{background-color:#1a2226;border:none;border-bottom:2px solid #0DB8DE;border-top:0px;border-radius:0;font-weight:bold;outline:0;padding-left:0;margin-bottom:20px;color:#ecf0f5}.form-group[_ngcontent-%COMP%]{margin-bottom:40px;outline:0px}.form-control[_ngcontent-%COMP%]:focus{border-color:inherit;box-shadow:none;border-bottom:2px solid #0DB8DE;outline:0;background-color:#1a2226;color:#ecf0f5}input[_ngcontent-%COMP%]:focus{outline:none;box-shadow:0 0}label[_ngcontent-%COMP%]{margin-bottom:0}.form-control-label[_ngcontent-%COMP%]{font-size:10px;color:#6c6c6c;font-weight:bold;letter-spacing:1px}.btn-outline-primary[_ngcontent-%COMP%]{border-color:#0db8de;color:#0db8de;border-radius:0;font-weight:bold;letter-spacing:1px;box-shadow:0 1px 3px #0000001f,0 1px 2px #0000003d}.btn-outline-success[_ngcontent-%COMP%]{border-color:#319e52;color:#319e52;border-radius:0;font-weight:bold;letter-spacing:1px;box-shadow:0 1px 3px #0000001f,0 1px 2px #0000003d}.btn-outline-primary[_ngcontent-%COMP%]:hover{background-color:#0db8de6e;right:0px}.login-btm[_ngcontent-%COMP%]{float:left}.login-button[_ngcontent-%COMP%]{padding-right:0;margin-bottom:25px}.login-text[_ngcontent-%COMP%]{text-align:left;padding-left:0;color:#a2a4a4}.loginbttm[_ngcontent-%COMP%]{padding:0}p[_ngcontent-%COMP%]{color:#ecf0f5}img[_ngcontent-%COMP%]{width:5rem}']}),e})();const v=function(){return["../registro"]},w=[{path:"login",component:(()=>{class e{constructor(t,r,l,s,c){this.auth=t,this.route=r,this.fb=l,this.jugadorSrv=s,this.toastr=c,this.user=new p.n,this.loginForm=this.fb.group({email:new n.NI("",[n.kI.required,n.kI.email]),password:new n.NI("",[n.kI.required,n.kI.minLength(8)])})}onLogin(){var t=this;return(0,u.Z)(function*(){t.user=t.loginForm.value;let r=!0;try{(yield t.auth.login(t.user))&&(t.auth.estaLogueado=!0,t.auth.isLoggedIn().subscribe(s=>{if(s&&r){let c;r=!1,t.user.iduser=s.uid,c=t.logIngreso(t.user.iduser),console.log(c),t.jugadorSrv.alta(c,"logsLoginRegister"),c=""}else t.user.iduser=""}),t.route.navigate([""]))}catch(l){console.log("Error en onLogin loginComponent. ",l)}})()}logIngreso(t){return{iduser:t,email:this.loginForm.value.email,fechaIngreso:new Date}}rellenarForm(t){t.preventDefault(),this.loginForm.setValue({email:"test@utn.com",password:"test123"})}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(m.e),o.Y36(a.F0),o.Y36(n.qu),o.Y36(f.w),o.Y36(b._W))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-login"]],decls:34,vars:3,consts:[[1,"container-login"],[1,"row","login-row"],[1,"col-lg-3","col-md-2"],[1,"col-lg-6","col-md-8","login-box"],[1,"col-lg-12","login-key"],["aria-hidden","true",1,"fa","fa-user","fa-lg"],[1,"col-lg-12","login-title"],[1,"col-lg-12","login-form"],[3,"formGroup","ngSubmit"],[1,"form-group"],[1,"form-control-label"],["type","email","formControlName","email","id","InputEmail","aria-describedby","emailHelp","placeholder","Escriba su email aqu\xed",1,"form-control"],["for","InputPassword",1,"form-control-label"],["type","password","formControlName","password","id","InputPassword","placeholder","Password","autocomplete","on",1,"form-control"],[1,"col-lg-12","loginbttm"],[1,"col-lg-6","login-btm","login-text"],[1,"row","login-button","d-grid","gap-2"],["type","submit",1,"btn","btn-outline-primary"],["type","button",1,"btn","btn-outline-success",3,"click"],[1,"form-group","mt-3"],[1,"text-center"],[3,"routerLink"]],template:function(t,r){1&t&&(o.TgZ(0,"div",0),o.TgZ(1,"div",1),o._UZ(2,"div",2),o.TgZ(3,"div",3),o.TgZ(4,"div",4),o._UZ(5,"i",5),o.qZA(),o.TgZ(6,"div",6),o._uU(7," LOGIN "),o.qZA(),o.TgZ(8,"div",7),o.TgZ(9,"div",7),o.TgZ(10,"form",8),o.NdJ("ngSubmit",function(){return r.onLogin()}),o.TgZ(11,"div",9),o.TgZ(12,"label",10),o._uU(13,"EMAIL"),o.qZA(),o._UZ(14,"input",11),o.qZA(),o.TgZ(15,"div",9),o.TgZ(16,"label",12),o._uU(17,"PASSWORD"),o.qZA(),o._UZ(18,"input",13),o.qZA(),o.TgZ(19,"div",14),o._UZ(20,"div",15),o.TgZ(21,"div",16),o.TgZ(22,"button",17),o._uU(23,"LOGIN"),o.qZA(),o.TgZ(24,"button",18),o.NdJ("click",function(s){return r.rellenarForm(s)}),o._uU(25,"TEST"),o.qZA(),o.qZA(),o.qZA(),o.TgZ(26,"div",19),o.TgZ(27,"p",20),o._uU(28,"\xbfA\xfan no est\xe1s "),o.TgZ(29,"span"),o.TgZ(30,"a",21),o._uU(31,"registrado"),o.qZA(),o.qZA(),o._uU(32,"?"),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o._UZ(33,"div",2),o.qZA(),o.qZA(),o.qZA()),2&t&&(o.xp6(10),o.Q6J("formGroup",r.loginForm),o.xp6(20),o.Q6J("routerLink",o.DdM(2,v)))},directives:[n._Y,n.JL,n.sg,n.Fj,n.JJ,n.u,a.yS],styles:['.login-row[_ngcontent-%COMP%]{height:100vh!important}.container-login[_ngcontent-%COMP%]{background-color:#222d32!important;font-family:"Roboto",sans-serif}.login-box[_ngcontent-%COMP%]{margin-top:2rem;height:80vh;background:#1A2226;text-align:center;box-shadow:0 3px 6px #00000029,0 3px 6px #0000003b}.login-key[_ngcontent-%COMP%]{height:100px;font-size:80px;line-height:100px;background:-webkit-linear-gradient(#27EF9F,#0DB8DE);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.login-title[_ngcontent-%COMP%]{text-align:center;font-size:30px;letter-spacing:2px;margin-top:15px;font-weight:bold;color:#ecf0f5}.login-form[_ngcontent-%COMP%]{margin-top:25px;text-align:left}input[type=email][_ngcontent-%COMP%]{background-color:#1a2226;border:none;border-bottom:2px solid #0DB8DE;border-top:0px;border-radius:0;font-weight:bold;outline:0;margin-bottom:20px;padding-left:0;color:#ecf0f5}input[type=password][_ngcontent-%COMP%]{background-color:#1a2226;border:none;border-bottom:2px solid #0DB8DE;border-top:0px;border-radius:0;font-weight:bold;outline:0;padding-left:0;margin-bottom:20px;color:#ecf0f5}.form-group[_ngcontent-%COMP%]{margin-bottom:40px;outline:0px}.form-control[_ngcontent-%COMP%]:focus{border-color:inherit;box-shadow:none;border-bottom:2px solid #0DB8DE;outline:0;background-color:#1a2226;color:#ecf0f5}input[_ngcontent-%COMP%]:focus{outline:none;box-shadow:0 0}label[_ngcontent-%COMP%]{margin-bottom:0}.form-control-label[_ngcontent-%COMP%]{font-size:10px;color:#6c6c6c;font-weight:bold;letter-spacing:1px}.btn-outline-primary[_ngcontent-%COMP%]{border-color:#0db8de;color:#0db8de;border-radius:0;font-weight:bold;letter-spacing:1px;box-shadow:0 1px 3px #0000001f,0 1px 2px #0000003d}.btn-outline-success[_ngcontent-%COMP%]{border-color:#319e52;color:#319e52;border-radius:0;font-weight:bold;letter-spacing:1px;box-shadow:0 1px 3px #0000001f,0 1px 2px #0000003d}.btn-outline-primary[_ngcontent-%COMP%]:hover{background-color:#0db8de6e;right:0px}.login-btm[_ngcontent-%COMP%]{float:left}.login-button[_ngcontent-%COMP%]{padding-right:0;margin-bottom:25px}.login-text[_ngcontent-%COMP%]{text-align:left;padding-left:0;color:#a2a4a4}.loginbttm[_ngcontent-%COMP%]{padding:0}p[_ngcontent-%COMP%]{color:#ecf0f5}img[_ngcontent-%COMP%]{width:5rem}']}),e})()},{path:"registro",component:Z}];let C=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[a.Bz.forChild(w)],a.Bz]}),e})(),_=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[h.ez,C,n.u5,n.UX,a.Bz]]}),e})()}}]);