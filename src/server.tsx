import * as React from 'react';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import * as express from 'express';
import { renderToString } from 'react-dom/server';

import App from './app';
import InitialHeaders from './platform/constants/initial-headers';
import ProductController from './platform/api/product';
import Settings from './platform/services/settings';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST || '');
const server = express();

function buildMarkup(url: string) {
  const context: StaticRouterContext = {};
  const markup = renderToString(
    <StaticRouter context={context} location={url}>
      <App />
    </StaticRouter>
  );

  return { context, markup };
}

function buildHTML(markup: string, title: string, description: string, keywords: string, image?: string, language?: string) {
  const content = `
    <!doctype html>
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-145864599-1"></script>
        <script>
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-145864599-1');
        </script>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />         
        <meta name="google-site-verification" content="google-site-verification=PlXejPyELq-_cqljjgnFQwScWaNVNSBbrwcxORqYJew" />
        <meta name="keywords" content="${keywords}" />
        <meta name="description" content="${description}" />
        <meta name="og:description" content="${description}" />
        <meta name="theme-color" content="#FFFFFF" />
        ${
    image
      ? `<meta name="og:image" content="${image}" />`
      : ''
    }
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
    assets.client.css
      ? `<link rel="stylesheet" type="text/css" href="${assets.client.css}">`
      : ''
    }
        ${
    process.env.NODE_ENV === 'production'
      ? `<script src="${assets.client.js}" defer></script>`
      : `<script src="${assets.client.js}" defer crossorigin></script>`
    }   
       
    <script>
      var y = window.localStorage.getItem('language');
      var x = +y === 2 ? 'RU' : +y === 3 ? 'EN' : 'HY';
      var script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = "https://maps.googleapis.com/maps/api/js?key=${Settings.googleAPIKey}&libraries=places&language=" + x;
      document.head.appendChild(script);
    </script>

    <!-- Yandex.Metrika counter --> 
    <script type="text/javascript" > (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(62710276, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true, ecommerce:"dataLayer" });
    </script> <!-- /Yandex.Metrika counter -->

        
      <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '392096548151413',
          cookie     : true,
          xfbml      : true,
          version    : '{api-version}'
        });
          
        FB.AppEvents.logPageView();   
          
      };

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      </script>

        <title>${title}</title>
      </head>
      <body>
        <main id="P-content">${markup}</main>
        <div id="P-modals"></div>
        
        <script>
        window.fbAsyncInit = function() {
          FB.init({
            appId            : '${392096548151413}',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v5.0'
          });
        };
      </script>
      <script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>

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
          `ineed: ${result.data.metaKeywords.keywords}`,
          `${result.data.metaKeywords.title}`,
          `${result.data.metaKeywords.description}`,
          result.data.images ? result.data.images[0].path : '',
        );

        res.status(200).send(html);
      } else {
        const html = buildHTML(
          markup,
          InitialHeaders.Title,
          InitialHeaders.Description,
          InitialHeaders.Keywoards,
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
        InitialHeaders.Keywoards,
      );
      res.status(200).send(html);
    }
  });

export default server;
