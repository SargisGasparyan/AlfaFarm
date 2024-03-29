import * as React from 'react';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import * as express from 'express';
import { renderToString } from 'react-dom/server';

import App from './app';
import InitialHeaders from './platform/constants/initial-headers';
import ProductController from './platform/api/product';
import Settings from 'platform/services/settings';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import { getFullLanguageCode } from 'platform/services/helper';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST || '');
const server = express();

function buildMarkup(url: string) {
  const context: StaticRouterContext = {};
  const markup = renderToString(
    <StaticRouter context={context} location={url}>
      <App/>
    </StaticRouter>
  );

  return { context, markup };
}

function buildHTML(markup: string, title: string, description: string, keywords: string, image?: string, language?: string) {
  const content = `
    <!doctype html>
    <html lang="en">
      <head>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NTE70R9Y92"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-NTE70R9Y92');
        </script>

        <!-- Yandex.Metrika counter -->
        <script type="text/javascript" >
           (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
           m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
           (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
           ym(71186425, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
           });
        </script>
        <noscript><div><img src="https://mc.yandex.ru/watch/71186425" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
        <!-- /Yandex.Metrika counter -->

        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-52SF6KS');</script>
        
        <!-- End Google Tag Manager -->
        
        
        <!-- Facebook Pixel Code -->
        
        <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '140139174633303');
        fbq('track', 'PageView');
        </script>
        
        <noscript>
        <img height="1" width="1" 
        src="https://www.facebook.com/tr?id=140139174633303&ev=PageView&noscript=1"/>
        </noscript>
        
        <!-- End Facebook Pixel Code -->

      
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />         
        <meta name="facebook-domain-verification" content="nycag5degd8cy0gidcperwa3m4jf9j" />
        <meta name="google-site-verification" content="gL59BYIM665WISAI5mzFgmhhDTuUA1EniJgDVIdyRa4" />
        <meta name="keywords" content="${keywords}" />
        <meta name="description" content="${description}" />
        <meta name="og:description" content="${description}" />
        <meta name="theme-color" content="#FFFFFF" />
        ${
    image
      ? `<meta name="og:image" content="${image}" />`
      : ''
  }
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${
    assets.client.css
      ? `<link rel="stylesheet" type="text/css" href="${assets.client.css}" />`
      : ''
  }
        ${
    process.env.NODE_ENV === 'production'
      ? `<script src="${assets.client.js}" defer></script>`
      : `<script src="${assets.client.js}" defer crossorigin></script>`
  }   

        
      <script>
        (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = function() {
          FB.init({
            appId            : '${Settings.facebookId}',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v5.0'
          });
        };
      </script>

        <title>${title}</title>
      </head>
      <body>
      <!-- Google Tag Manager (noscript) -->
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-52SF6KS"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

        <main id="P-content">${markup}</main>
        <div id="P-modals"></div>
        <script src="https://maps.googleapis.com/maps/api/js?key=${Settings.googleAPIKey}&libraries=places"></script>
      </body>
    </html>
  `;

  return content;
}

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ''))
  .get('/products/details/:id', async (req, res) => {
    const { context, markup } = buildMarkup(req.url);
    if (context.url) res.redirect(context.url);
    else {
      const result = await ProductController.ServerDetails(req.params.id);
      if (result.success) {
        // const tagReplaceRegex = /<[^>]+>/g;
        // const desc = result.data.description.replace(tagReplaceRegex, '');
        // const formattedDesc = desc.length > 160 ? `${desc.substr(0, 157)}...` : desc;

        const html = buildHTML(
          markup,
          `AlfaPharm: ${result.data.title}`,
          `${result.data.title}`,
          `Product Medicine Pharmacy ${result.data.title}`,
          result.data.images ? result.data.images[0].path : ''
        );

        res.status(200).send(html);
      } else {
        const html = buildHTML(
          markup,
          InitialHeaders.Title,
          InitialHeaders.Description,
          InitialHeaders.Keywoards
        );

        res.status(200).send(html);
      }
    }
  }).get('/*', (req, res) => {
  const { context, markup } = buildMarkup(req.url);

  if (context.url) res.redirect(context.url);
  else {
    const html = buildHTML(
      markup,
      InitialHeaders.Title,
      InitialHeaders.Description,
      InitialHeaders.Keywoards
    );
    res.status(200).send(html);
  }
});

export default server;
