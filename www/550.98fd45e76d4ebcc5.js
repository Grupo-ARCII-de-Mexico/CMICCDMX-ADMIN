"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[550],{550:(A,g,n)=>{n.r(g),n.d(g,{DirectorioVerPageModule:()=>V});var p=n(6814),f=n(95),a=n(9843),d=n(7564),u=n(5861),e=n(6689),h=n(8147),Z=n(7153),v=n(930),y=n(4433),D=n(2425);function x(o,s){if(1&o){const i=e.EpF();e.TgZ(0,"ion-item",13)(1,"ion-label"),e._uU(2),e.TgZ(3,"p"),e._uU(4),e.qZA()(),e.TgZ(5,"ion-buttons",14)(6,"ion-button",15),e._UZ(7,"ion-icon",16),e.qZA(),e.TgZ(8,"ion-button",17),e.NdJ("click",function(){const c=e.CHM(i).$implicit,l=e.oxw(2);return e.KtG(l.deleteDirectorio(c.id))}),e._UZ(9,"ion-icon",18),e.qZA()(),e._UZ(10,"ion-reorder",19),e.qZA()}if(2&o){const i=s.$implicit;e.xp6(2),e.hij("",i.nombre," "),e.xp6(2),e.Oqu(i.cargo),e.xp6(2),e.MGl("routerLink","/dashboard/website/directorio/",i.id,"")}}function P(o,s){if(1&o&&(e.TgZ(0,"ion-list",13),e.YNc(1,x,11,3,"ion-item",12),e.qZA()),2&o){const i=s.$implicit;e.xp6(1),e.Q6J("ngForOf",i.directorios)}}const b=[{path:"",component:(()=>{var o;class s{constructor(t,r,c,l,m){this.depaRepo=t,this.loading=r,this.genericS=c,this.alert=l,this.toast=m}ngOnInit(){this.depaRepo.directorio$.subscribe(t=>{this.depas=t})}deleteDirectorio(t){var r=this;return(0,u.Z)(function*(){var c;yield r.alert.setData({animated:!0,header:"Est\xe1 a punto de eliminar este registro",message:"\xbfDesea continuar?",buttons:[{text:"Cancelar"},{text:"Confirmar",handler:(c=(0,u.Z)(function*(){r.loading.setData({animated:!0,message:"Eliminando",spinner:"dots"}),yield r.loading.create(),yield r.loading.show(),r.genericS.delete("directorio",t).subscribe(function(){var l=(0,u.Z)(function*(m){yield r.loading.hide(),r.eliminarDirectorio(t),r.toast.success("Registro Eliminado")});return function(m){return l.apply(this,arguments)}}())}),function(){return c.apply(this,arguments)})}]})})()}eliminarDirectorio(t){for(const r of this.depas){const c=r.directorios.findIndex(l=>l.id===t);if(-1!==c){r.directorios.splice(c,1);break}}}}return(o=s).\u0275fac=function(t){return new(t||o)(e.Y36(h.R),e.Y36(Z.b),e.Y36(v.M),e.Y36(y.c),e.Y36(D._W))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-directorio-ver"]],decls:22,vars:3,consts:[[3,"fullscreen"],["color","dark",1,"py-2"],[1,"ms-2","ms-md-5","mb-0","titulo"],[1,"palito","ms-2","ms-md-5","mt-0","mb-3"],[1,"px-3"],[1,"container"],[1,"d-flex","mt-1","d-none"],["placeholder","Buscar Persona","inputmode","text","type","text",1,"ms-auto","me-3","my-0","w-100",3,"debounce"],[1,"table","mt-3"],[1,"red"],["scope","col",1,"red","d-flex"],[1,"ms-auto","me-5"],["class","w-100",4,"ngFor","ngForOf"],[1,"w-100"],["color","primary","slot","end"],["color","primary",3,"routerLink"],["slot","icon-only","name","create-outline"],["color","primary","slot","end",3,"click"],["slot","icon-only","name","trash-outline"],["slot","end"]],template:function(t,r){1&t&&(e.TgZ(0,"ion-content",0),e._UZ(1,"br"),e.TgZ(2,"ion-toolbar",1),e._UZ(3,"br"),e.TgZ(4,"h1",2)(5,"b"),e._uU(6," Directorio"),e.qZA()(),e._UZ(7,"hr",3),e.qZA(),e.TgZ(8,"div",4)(9,"div",5)(10,"div",6),e._UZ(11,"ion-searchbar",7),e.qZA(),e.TgZ(12,"table",8)(13,"thead",9)(14,"tr")(15,"th",10)(16,"span"),e._uU(17,"Asociado"),e.qZA(),e.TgZ(18,"span",11),e._uU(19,"Opciones"),e.qZA()()()(),e.TgZ(20,"tbody"),e.YNc(21,P,2,1,"ion-list",12),e.qZA()()()()()),2&t&&(e.Q6J("fullscreen",!0),e.xp6(11),e.Q6J("debounce",250),e.xp6(10),e.Q6J("ngForOf",r.depas))},dependencies:[p.sg,a.YG,a.Sm,a.W2,a.gu,a.Ie,a.Q$,a.q_,a.Nh,a.VI,a.sr,a.j9,a.YI,d.rH],styles:[".img-fluid[_ngcontent-%COMP%]{max-width:200px}.red[_ngcontent-%COMP%]{background-color:var(--ion-color-primary);color:#fff}"]}),s})()}];let T=(()=>{var o;class s{}return(o=s).\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[d.Bz.forChild(b),d.Bz]}),s})(),V=(()=>{var o;class s{}return(o=s).\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[p.ez,f.u5,a.Pc,T]}),s})()}}]);