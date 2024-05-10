export function WhatsApp(){
    const script = document.createElement('script');
    script.src = 'https://d2mpatx37cqexb.cloudfront.net/delightchat-whatsapp-widget/embeds/embed.min.js';
    document.body.appendChild(script);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      var wa_btnSetting = {"btnColor":"#fb041c","ctaText":"Contáctanos","cornerRadius":40,"marginBottom":20,"marginLeft":20,"marginRight":20,"btnPosition":"right","whatsAppNumber":"525625692061","welcomeMessage":"¡Hola! Requiero más información sobre la CMIC ","zIndex":999999,"btnColorScheme":"light"};
      var wa_widgetSetting = {"title":"CMIC Ciudad de Mexico","subTitle":"Normalmente responde en segundos","headerBackgroundColor":"#fb041c","headerColorScheme":"light","greetingText":"Hola! Como podemos ayudarte?","ctaText":"Comenzar chat","btnColor":"#1A1A1A","cornerRadius":40,"welcomeMessage":"Hello","btnColorScheme":"light","brandImage":"https://afiliados.cmiccdmx.org/assets/logo.png","darkHeaderColorScheme":{"title":"#333333","subTitle":"#4F4F4F"}};
      window.onload = () => {
        _waEmbed(wa_btnSetting, wa_widgetSetting);
      };
    `;
    document.body.appendChild(script2);
  }