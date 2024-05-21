"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6488],{6488:(J,m,t)=>{t.r(m),t.d(m,{LoginPageModule:()=>x});var v=t(6814),r=t(95),a=t(9843),f=t(7564),g=t(5861),p=t(6306),h=t(9773),y=t(9397),P=t(3843),u=t(553),o=t(6689),b=t(7153),Z=t(3614),S=t(930),w=t(1328);const L=[{path:"",component:(()=>{var e;class l{constructor(n,i,s,c,T,F){this.fb=n,this.loading=i,this.toast=s,this.genericService=c,this.errorService=T,this.navController=F,this.viewPassword=!1}ngOnInit(){this.loginForm=this.fb.group({email:[null,r.kI.required],password:[null,r.kI.required]}),this.loading.setData({animated:!0,backdropDismiss:!1,message:"Iniciando Sesi\xf3n",spinner:"crescent"}),localStorage.getItem(u.N.jwt)&&(0,P.r)(localStorage.getItem(u.N.jwt)||"")&&this.navController.navigateForward("/dashboard")}login(){var n=this;return(0,g.Z)(function*(){yield n.loading.create(),yield n.loading.show(),n.genericService.post("user/login",n.loginForm.value).pipe((0,p.K)(function(){var i=(0,g.Z)(function*(s){return yield n.errorService.catchError(s),yield n.loading.hide(),{user:{names:""},jwt:"undefined"}});return function(s){return i.apply(this,arguments)}}()),(0,h.R)(n.errorService.next),(0,y.b)(function(){var i=(0,g.Z)(function*({user:s,jwt:c}){n.toast.setData({message:"Bienvenido: "+s.names,duration:3e3,color:"success"}),yield n.loading.hide(),yield n.toast.create(),yield n.toast.show(),localStorage.setItem(u.N.jwt,c),n.navController.navigateForward("/dashboard",{animated:!0})});return function(s){return i.apply(this,arguments)}}())).subscribe()})()}}return(e=l).\u0275fac=function(n){return new(n||e)(o.Y36(r.qu),o.Y36(b.b),o.Y36(Z.k),o.Y36(S.M),o.Y36(w.T),o.Y36(a.SH))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-login"]],decls:20,vars:5,consts:[[3,"fullscreen"],[1,"h-100","d-flex","fondo"],[1,"row","m-auto","px-5","px-md-0","rounded",2,"width","80vh"],[1,"col-md-6","f","border-end","d-flex"],["src","../../../assets/logo.png","alt","",1,"m-auto","img-fluid",2,"width","200px"],[1,"col-md-6","bg-white","d-flex"],[1,"m-auto","p-0",3,"formGroup","ngSubmit"],["color","primary"],["label","Correo","labelPlacement","floating","required","","formControlName","email","type","text"],["label","Contrase\xf1a","labelPlacement","floating","required","","formControlName","password",3,"type"],["fill","clear",3,"click"],["slot","icon-only",3,"name"],[1,"d-flex","my-3"],["block","","color","primary","shape","round","type","submit",1,"mx-auto",3,"disabled"]],template:function(n,i){1&n&&(o.TgZ(0,"ion-content",0)(1,"div",1)(2,"div",2)(3,"div",3),o._UZ(4,"img",4),o.qZA(),o.TgZ(5,"div",5)(6,"form",6),o.NdJ("ngSubmit",function(){return i.login()}),o.TgZ(7,"ion-text",7)(8,"h1")(9,"strong"),o._uU(10,"Iniciar Sesi\xf3n"),o.qZA()()(),o.TgZ(11,"ion-item"),o._UZ(12,"ion-input",8),o.qZA(),o.TgZ(13,"ion-item"),o._UZ(14,"ion-input",9),o.TgZ(15,"ion-button",10),o.NdJ("click",function(){return i.viewPassword=!i.viewPassword}),o._UZ(16,"ion-icon",11),o.qZA()(),o.TgZ(17,"div",12)(18,"ion-button",13),o._uU(19," Iniciar sesi\xf3n "),o.qZA()()()()()()()),2&n&&(o.Q6J("fullscreen",!0),o.xp6(6),o.Q6J("formGroup",i.loginForm),o.xp6(8),o.Q6J("type",i.viewPassword?"text":"password"),o.xp6(2),o.Q6J("name",i.viewPassword?"eye-off-outline":"eye-outline"),o.xp6(2),o.Q6J("disabled",i.loginForm.invalid))},dependencies:[r._Y,r.JJ,r.JL,r.Q7,r.sg,r.u,a.YG,a.W2,a.gu,a.pK,a.Ie,a.yW,a.j9],styles:["ion-img[_ngcontent-%COMP%]{width:250px}.fondo[_ngcontent-%COMP%]{background-image:url(fondoooo.c461436d64d3b68b.jpg);background-size:cover;background-repeat:no-repeat;background-position:center}.rounded[_ngcontent-%COMP%]{border-radius:15px}.f[_ngcontent-%COMP%]{background-color:var(--ion-color-primary);min-height:30vh}"]}),l})()}];let C=(()=>{var e;class l{}return(e=l).\u0275fac=function(n){return new(n||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[f.Bz.forChild(L),f.Bz]}),l})(),x=(()=>{var e;class l{}return(e=l).\u0275fac=function(n){return new(n||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[v.ez,r.u5,r.UX,a.Pc,C]}),l})()}}]);