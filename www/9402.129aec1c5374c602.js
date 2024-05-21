"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9402],{9402:(J,m,r)=>{r.r(m),r.d(m,{CrearPageModule:()=>P});var h=r(6814),s=r(95),o=r(9843),p=r(7564),u=r(5861),v=r(4664),e=r(6689),C=r(1135),b=r(2425),Z=r(930),y=r(7153);const f=function(){return{standalone:!0}},M=[{path:"",component:(()=>{var i;class d{constructor(n,a,t,l,g,A){this.depaRepo=n,this.toast=a,this.genericS=t,this.params=l,this.nav=g,this.loading=A,this.editar=!1,this.nombre="",this.tipo=-1}ngOnInit(){var n=this;this.params.params.pipe((0,v.w)(a=>{var t;return this.identificador=Number(null!==(t=null==a?void 0:a.id)&&void 0!==t?t:0),this.depaRepo.calendario$})).subscribe(function(){var a=(0,u.Z)(function*(t){if(0!==n.identificador){const l=t.find(g=>g.id===n.identificador);n.nombre=l.texto,n.tipo=l.tipo,n.editar=!0}});return function(t){return a.apply(this,arguments)}}())}save(){var n=this;return(0,u.Z)(function*(){n.editar?yield n.edit():(n.loading.setData({animated:!0,message:"Guardando",spinner:"dots"}),yield n.loading.create(),yield n.loading.show(),n.genericS.post("calendario-capacitaciones",n.createFormData()).subscribe(function(){var a=(0,u.Z)(function*(t){n.depaRepo.addCalendario(t),yield n.loading.hide(),n.tipo=-1,n.nombre="",n.file=void 0,n.toast.success("Calendario Guardado")});return function(t){return a.apply(this,arguments)}}()))})()}edit(){var n=this;return(0,u.Z)(function*(){n.loading.setData({animated:!0,message:"Guardando",spinner:"dots"}),yield n.loading.create(),yield n.loading.show(),n.genericS.update("calendario-capacitaciones",n.identificador,n.createFormData()).subscribe(function(){var a=(0,u.Z)(function*(t){n.depaRepo.updateCalendario(t.id,t),yield n.loading.hide(),n.tipo=-1,n.nombre="",n.file=void 0,n.toast.success("Calendario Actualizado"),n.nav.navigateBack("/dashboard/website/calendarios")});return function(t){return a.apply(this,arguments)}}())})()}createFormData(){const n=new FormData;return n.append("texto",this.nombre),n.append("tipo",String(this.tipo)),n.append("file",this.file),n}onFileSelected(n){this.file=n.target.files[0],n.target.value=""}click(n){document.getElementById(n).click()}}return(i=d).\u0275fac=function(n){return new(n||i)(e.Y36(C.z),e.Y36(b._W),e.Y36(Z.M),e.Y36(p.gz),e.Y36(o.SH),e.Y36(y.b))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-crear"]],decls:37,vars:16,consts:[[3,"fullscreen"],["color","dark",1,"py-2"],[1,"ms-2","ms-md-5","mb-0","titulo"],[1,"palito","ms-2","ms-md-5","mt-0","mb-3"],[1,"container","px-5"],[1,"row","mt-5"],[1,""],["expand","block","slot","end",3,"color","click"],["type","file","accept",".pdf",2,"display","none",3,"id","change"],["type","text","label","Mes y A\xf1o","labelPlacement","floating",1,"my-2","border",3,"ngModelOptions","ngModel","ngModelChange"],["label","Instituci\xf3n ","labelPlacement","stacked",3,"ngModelOptions","ngModel","ngModelChange"],[3,"value"],["expand","block","shape","round",3,"disabled","click"]],template:function(n,a){1&n&&(e.TgZ(0,"ion-content",0),e._UZ(1,"br"),e.TgZ(2,"ion-toolbar",1),e._UZ(3,"br"),e.TgZ(4,"h1",2)(5,"b"),e._uU(6),e.qZA()(),e._UZ(7,"hr",3),e.qZA(),e.TgZ(8,"div",4)(9,"div",5)(10,"div",6)(11,"h3")(12,"strong"),e._uU(13,"Crear Registro En Directorio"),e.qZA()(),e.TgZ(14,"form"),e._UZ(15,"br")(16,"br"),e.TgZ(17,"ion-button",7),e.NdJ("click",function(){return a.click("AA")}),e.TgZ(18,"ion-label"),e._uU(19),e.qZA(),e.TgZ(20,"input",8),e.NdJ("change",function(l){return a.onFileSelected(l)}),e.qZA()(),e._UZ(21,"br")(22,"br"),e.TgZ(23,"ion-input",9),e.NdJ("ngModelChange",function(l){return a.nombre=l}),e.qZA(),e._UZ(24,"br")(25,"br"),e.TgZ(26,"ion-select",10),e.NdJ("ngModelChange",function(l){return a.tipo=l}),e.TgZ(27,"ion-select-option",11),e._uU(28,"ICIC"),e.qZA(),e.TgZ(29,"ion-select-option",11),e._uU(30,"ITC"),e.qZA(),e.TgZ(31,"ion-select-option",11),e._uU(32,"FIC"),e.qZA()(),e._UZ(33,"br")(34,"br"),e.TgZ(35,"ion-button",12),e.NdJ("click",function(){return a.save()}),e._uU(36),e.qZA()()()()()()),2&n&&(e.Q6J("fullscreen",!0),e.xp6(6),e.hij(" ",a.editar?"Editar":"Crear"," Calendario"),e.xp6(11),e.Q6J("color",a.file?"success":"primary"),e.xp6(2),e.Oqu(a.file?"Archivo Cargado":"Seleccionar archivo"),e.xp6(1),e.Q6J("id","AA"),e.xp6(3),e.Q6J("ngModelOptions",e.DdM(14,f))("ngModel",a.nombre),e.xp6(3),e.Q6J("ngModelOptions",e.DdM(15,f))("ngModel",a.tipo),e.xp6(1),e.Q6J("value",0),e.xp6(2),e.Q6J("value",1),e.xp6(2),e.Q6J("value",2),e.xp6(4),e.Q6J("disabled",-1!==a.tipo&&0==a.nombre.length),e.xp6(1),e.hij(" ",a.editar?"Guardar Cambios":"Crear Calendario"," "))},dependencies:[s._Y,s.JJ,s.JL,s.On,s.F,o.YG,o.W2,o.pK,o.Q$,o.t9,o.n0,o.sr,o.QI,o.j9]}),d})()}];let T=(()=>{var i;class d{}return(i=d).\u0275fac=function(n){return new(n||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[p.Bz.forChild(M),p.Bz]}),d})(),P=(()=>{var i;class d{}return(i=d).\u0275fac=function(n){return new(n||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[h.ez,s.u5,o.Pc,T]}),d})()}}]);