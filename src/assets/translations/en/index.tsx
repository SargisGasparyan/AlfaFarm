import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';

const cardInfo = <>
  <p>Հարգելի հաճախորդներ, Ալֆա Ֆարմ դեղատների ցանցը 01.11.2016թ․-ից գործարկում է հաճախորդների խրախուսման նոր բոնուսային ծրագիր, որը հնարավորություն է ընձեռում հաճախորդներին կատարելով գնումներ Ալֆա Ֆարմ դեղատներից, դրանց դիմաց կուտակել միավորներ և ծախսել ցանկացած ժամանակ: Միավորները կուտակվում են կախված կատարված գնումների գումարի չափից, ինչպես նաև քարտապանները հնարավորություն կունենան կուտակել ԲԱՐՁՐ միավորներ՝ կատարելով գնումներ կիրակի օրերին, ընտրելով իրենց կողմից հաճախակի գնվող 2 ապրանքատեսակ կամ գնելով նշված ապրանքանիշերի տեսականուց։</p>
  <h4>«ԱլֆաՔարտ» Բոնուսային ծրագիր</h4>
  <p>Ներկայացրեք «ԱլֆաՔարտ»-ը և կուտակեք միավորներ ըստ հետևյալ սանդղակի.</p>


  <ul>
    <li>2 միավոր  յուրաքանչյուր 100 դրամի դիմաց` մինչև 10 000 դրամ միանվագ գնում կատարելու դեպքում</li>
    <li>3 միավոր յուրաքանչյուր 100 դրամի դիմաց` 10 000-ից մինչև 20 000 դրամ միանվագ գնում կատարելու դեպքում</li>
    <li>5 միավոր  յուրաքանչյուր 100 դրամի դիմաց` 20 000 դրամ և ավել միանվագ գնում կատարելու դեպքում</li>
    <li>+1 լրացուցիչ միավոր յուրաքանչյուր 100 դրամի դիմաց` 40 000 դրամ և ավել միանվագ գնում կատարելու դեպքում</li>
    <li>+1 լրացուցիչ միավոր յուրաքանչյուր 100 դրամի դիմաց՝  կիրակի օրերին գնումներ կատարելիս</li>
  </ul>

  <p>Նաև հնարավորություն ունեք կուտակել բարձր միավորներ`</p>

  <ul>
    <li>ընտրեք կամայական երկու Հատուկ ապրանքատեսակ և կուտակեք ավելի շատ՝  յուրաքանչյուր 100 դրամի դիմաց, կախված ապրանքատեսակից: Ապրանքները կարող են փոփոխվել ամեն 3 ամիսը մեկ:</li>
    <li>կուտակեք հատուկ բարձր միավորներ յուրաքանչյուր 100 դրամի դիմաց` հետևյալ ապրանքանիշերի ապրանքատեսակները գնելիս. Avene,Vichy, La Roche-Posay, Ducray, Bambo, Mustela, Bebble, Maternea, Derma, Canpol, Abena, Lavena, Abri, Bioderma, Swiss image, Swiss code, Vetia floris, Himalaya:</li>
  </ul>

  <p>Վերոնշյալ կուտակումների դեպքում ստանդարտ կուտակման սանդղակը չի գործում։</p>

  <p>Ցածր միավորներ կարող են տրամադրվել կամ ընդհանրապես չտրամադրվել ընկերության կողմից   որոշ փոքրաքանակ ապրանքախմբերի համար, որոնք վաճառվում են ցածր գներով կամ Հատուկ զեղչով:</p>
  <p>Առանձին ակցիաների դեպքում դրանց կուտակման պայմանները սահմանվում են առանձին-առանձին։</p>
  <p>Կուտակված միավորներն օգտագործելիս դրանց դիմաց նոր միավորներ չեն կուտակվում։ </p>
  <p>Մեկ տարուց ավել քարտը չօգտագործելու դեպքում այն ավտոմատ կարգելափակվի և միավորները կզրոյացվեն:</p>

  <h4>«Ալֆա Քարտ» - «Բոնուսային» ծրագիր կորպորատիվ հաճախորդների համար</h4>
  <p>«Ալֆա Քարտ» կորպորատիվ հաճախորդների բոնուսային կուտակային ծրագիրը հնարավորություն է ընձեռում հաճախորդներին կատարել գնումներ «Ալֆա-Ֆարմ» դեղատներից, դրանց դիմաց կուտակել միավորներ և ծախսել ցանկացած ժամանակ` մաս-մաս կամ ամբողջությամբ (1 միավորի արժեքը 1 դրամ է): Միավորները կուտակվում են կախված հաճախորդի միանվագ կատարված գնումների գումարի չափից` ըստ հետևյալ սանդղակի.</p>

  <ul>
    <li>6 միավոր  յուրաքանչյուր 100 դրամի դիմաց` մինչև 10 000 դրամ միանվագ գնում կատարելու դեպքում</li>
    <li>7 միավոր յուրաքանչյուր 100 դրամի դիմաց` 10 000-ից մինչև 20 000 դրամ միանվագ գնում կատարելու դեպքում</li>
    <li>9 միավոր  յուրաքանչյուր 100 դրամի դիմաց` 20 000 դրամ և ավել միանվագ գնում կատարելու դեպքում</li>
    <li>+1 լիացուցիչ միավոր յուրաքանչյուր 100 դրամի դիմաց` 40 000 դրամ և ավել միանվագ գնում կատարելու դեպքում</li>
  </ul>

  <p>Քարտապանը հնարավորություն ունի նաև հիմնական սանդղակից զատ կուտակել լրացուցիչ բարձր միավորներ`</p>

  <ul>
    <li>«Հատուկ» բարձր միավորներ յուրաքանչյուր 100 դրամի դիմաց` յուրաքանչյուր քարտապան ունի հնարավորություն նշել 2 «Հատուկ ապրանքատեսակ», որը նա կարող է գնել և ստանալ լրացուցիչ միավորներ: Ապրանքները կարող են փոփոխվել ամեն 3 ամիսը մեկ: Նշյալ կուտակումների դեպքում ստանդարտ կուտակման սանդղակը չի գործում։</li>
    <li>«Հատուկ» բարձր միավորներ յուրաքանչյուր 100 դրամի դիմաց` յուրաքանչյուր քարտապան ունի հնարավորություն կուտակել բարձր միավորներ հետևյալ ապրանքանիշերի ապրանքատեսակները գնելիս` Avene, Vichy, La-Roche-Posay, Ducray, Bambo, Mustela, Bebble, Maternea, Derma, Canpol, Abena, Lavena, Abri, Bioderma, Swiss image, Himalaya:  Նշյալ կուտակումների դեպքում ստանդարտ կուտակման սանդղակը չի գործում։</li>
    <li>+1 լրացուցիչ միավոր յուրաքանչյուր 100 դրամի դիմաց` յուրաքանչյուր քարտապան կունենա հնարավորություն կուտակել բարձր միավորներ կատարելով գնումներ ամսվա կիրակի օրերին:</li>
  </ul>

  <p>*1 տարուց ավել քարտը չօգտագործելու դեպքում, այն ավտոմատ կարգելափակվի:</p>
  <p>*Ցածր միավորներ կարող են տրամադրվել կամ ընդհանրապես չտրամադրվել ընկերության կողմից սահմանված որոշ փոքրաքանակ ապրանքախմբերի համար, որոնք վաճառվում են ցածր գներով կամ «Հատուկ զեղչով»-ով:</p>
  <p>* Առանձին ակցիաների դեպքում դրանց կուտակման պայմանները սահմանվում են առանձին-առանձին։</p>
  <p>*Կուտակված միավորներն օգտագործելիս դրանց դիմաց նոր միավորներ չեն կուտակվում։ </p>
  <p>Մեկ տարուց ավել քարտը չօգտագործելու դեպքում այն ավտոմատ կարգելափակվի և միավորները կզրոյացվեն:</p>
</>;

const contactText = <>
  Dear customers, <br /> <br />
  We thank you for your interest in our services. <br />    
  We are working to enhance our quality of our services offered for which we find a great importance of the feedback of our customers. <br />
  In case of questions or problems please complete the lines below or call by <br />
  <b>011 200 900</b> telephone number. <br /> <br />
  <address>
    CROMA GROUP LLC <br />
    0060, RA, c. Yerevan, Avan 4/14 <br />
    TC 00888954 <br />
    AMERIABANK CJSC <br />
    Gr.Lusavorich st 9 <br />
    B/A 1570020377270100
  </address>
</>;

const contractText = <>
  1. This agreement (in future ”contract”) defines and regulates the order of services rendering by “Croma Group” (in future also company) on the site Ineed.am(in future also site)<br /><br />
  2. Entering the site, using any service or introducing any content fully or partially, you, as a user (in future also USER, YOU, YOUR, CUSTOMER) confirm, that you have read and fully understood the contract and all the conditions of service provision (in future conditions or agreement) by the company on the site and accept them, regardless you are a customer, user of the site or just a visitor.<br /><br />
  3. The company has right to modify the contract at any time, unilaterally, without prior notice. In this case the modified agreement will be placed on the site with an indication of the date of the last changes. While visiting the site the user must familiarize with the changes of the contract (if they are). Changes come  into  force from the date of placing them on the site and extend to the relations, appeared after that.<br /><br />
  4. If you do not agree with the contract you must stop using the site. Being on the site, opening an account, becoming a user of services indicates your unconditional acceptance of the contract and its conclusion.<br /><br />
  5. Concluding the agreement you confirm that you are fully capable and have the right to use the services. If you represent a juridical person you testify you are entitled to use the services on behalf of the juridical person. According these conditions you accept that the company is unable to check the information you give, the truthfulness of the information of this point, so, the responsibility for any breach of the point fully falls on you.<br /><br />
  6. For using the full scope of services of the company you must register on the site and create a personal home page(in future personal page of user or personal page). Each user can have one personal home page. The users have no right to use the personal page of other users. Creating the personal page the user must truthfully submit all the required information. The users are responsible for maintaining the entry information and activities of this page. If takes place an unresolved entrance to personal page of the user, he is obliged to inform the company immediately. In such cases the company is entitled to close the personal page till the whole clarification of the circumstances . Anyway, the company is not liable for the activities of other people on your personal page. Responsibility for damage to company and the third persons is upon the user himself.<br /><br />
  7. Services provided by company include, but are not limited the following;<br />
  <ul>
    <li>Organization of transportation of the goods purchased with the help of our company to customer.</li>
    <li>Organization of transportation of the goods, purchased by the customer himself.</li>
    <li>Warehousing of the goods of customers.</li>
  </ul>
  8. The company has right to refuse providing services to any physical or juridical person by his own discretion, if he has no opportunity of doing it.<br /><br />
  9. In the case of increasing of the total volume of orders(holidays, sale programs and events) the company has right to postpone the delivery time or to stop providing some services.<br /><br />
  10. The order must be delivered to the address, pointed on the companion document and must be given with the signature to the recipient of the order or the authorized representative. The recipient of the order confirms the receipt and points in the companion document;<br />
  <ul>
    <li>Name and surname</li>
    <li>Signature</li>
    <li>Date and time of delivery</li>
    <li>Written designation of integrity of order</li>
  </ul>
  11. In the case of impossibility of delivery of the order to the buyer(or legal representative), the goods are stored in the warehouse of the company for 30 days. The sender or the recipient can extend the time of storage .If within 30 days the order is not accepted and a relevant document is absent, the company has right to reject the order, keep the cost of the amount received by a comfortable price, and return the remaining amount to the customer or put in a deposit to notary or the lawyer.<br /><br />
  12. The order is handed in the presence of the document of identity; driving license or military ticket.<br /><br />
  13. In case of discharge of the obligations or performing improperly, the customer has right to present his written claim to the company or partner organization.<br /><br />
  14. In written claim must be pointed;<br />
  <ul>
    <li>Documents, confirming the identity of the person of the applicant(or legal representative)</li>
    <li>Essence of the requirement or the complaint.</li>
  </ul>
  15. Company studies the written requirements and answers in term, established by law.<br /><br />
  16. Company is not responsible for the offered and provided services done by the third parties on the site.
</>;

const exchangeReturnText = <>
  <b>Exchange and return of goods with proper quality</b><br /><br />
  Purchased goods can be returned or replaced with goods of a different size, shape, color, or similar configuration, making the necessary recalculation in case of a difference in price, within 14 days from the day the goods are delivered to the buyer, except for the cases and goods below, in the order established by the government<br />
  A non-food item with proper quality is replaced or returned if this item has not been used, it has retained its presentation, consumer quality, seals, tags, documents confirming payment, as proof that the purchase was made from thisseller.<br /><br />
  <b>Goods with proper quality can not be returned:</b><br /><br />
  a) if the manufacture of the goods and its supply are carried out by a special order of the consumer, or the goods are personified.<br />
  b) when perishable goods are sold, destroyed or changing quality.<br />
  c) in the case of the sale of goods that, after delivery, based on its nature, are inextricably merged with each other.<br />
  e) in the case of sealed audio or video recordings or sealed programs by the buyer.<br />
  (e) in the case of deliveries of newspapers, magazines, books or other publications<br />
  g) under agreements, signed at auctions and exchanges<br />
  h) in case of digital deliveries that do not correspond to the digital carrier, whenthis was accomplished on the basis of a preliminary agreement with the buyer, according to which he loses his right of return.<br /><br />
  <b>Return or exchange of goods with inadequate quality.</b><br /><br />
  Upon receipt of the goods with inadequate quality, the seller has the right to conduct an examination of the quality of the goods, the results that will be presented to you. In technically difficult cases, the buyer's requirement to return or exchange for a similar sample, or other product, can be satisfied whena significant violation is detected in the product.<br />
  When a buyer purchases a product with inadequate quality, the seller is obligedto replace this product with a product with proper quality or return the amount paid to the buyer if the defects of the product are found during the shelf life.<br />
  The exchange or return of goods is regulated by the legislation of the Republic of Armenia “On Protection of Consumer Rights”.
</>;

const confidentialityConditionsText = <>
  This policy covers all those visitors, users and other persons, who uses the services of the site Ineed.am(in future site) or have right to use such services. We are going to inform what data are collected, worked out and used to register on the site. This policy can be changed  any time without prior notification, unilaterally. The changed version will be proclaimed on the site pointing the date of last changes. The new terms will receive legal force from the moment of put on the site and will extend to obligations, arised after this.
  The responsibility of visitors is to familiarize the changes of the site and it’s visiting from time to time.<br /><br />
  1. Visiting the site, you give your agreement to use and to work out the data, introduced by you on the site according this policy, otherwise you have no right to use the services of the site.<br /><br />
  2. Incapable persons, or who has not reached 18 years(except the cases of full recognition of legal capacity) have no right to use the services of the site. In the case of not possibility of authentication of data, entered by the user, we are not responsible for the consequences when using our services and for any violation of this point, the responsibility for this lies entirely on you.<br /><br />
  3. Personal data and other information. You can visit our site without registration, but if you want to use services fully, you must register on the site. Personal data are collected when you provide them. For the registration you must provide your name, address, e-mail and contact details.
  While visiting the site we collect some information about your computer, ID address, the browser name, type of computer, technical data of the user, communication means, such as operating system type, the name of internet service and others. This collected information gives us possibility to calculate the number of visitors, create statistics of page visits.
  The site is using cookies. These are alphanumeric lines, which are created while visiting the site and are copied in your computer. Cookies don’t collect personal information, they facilitate the using of site and make it more comfortable.<br />
  In this case the modified agreement will be placed on the site with an indication of the date of the last changes. While visiting the site the user must familiarize with the changes of the contract (if they are).Changes come  into  force from the date of placing them on the site and extend to the relations, appeared after that.<br /><br />
  4. Ways of using of the provided information;<br />
  <ul>
    <li>Offering of products and services you are interested in</li>
    <li>The implementation of services</li>
    <li>The assistance in the event of technical difficulties on the site</li>
    <li>Informing you about the news, new goods and services, special offers</li>
    <li>Improving the website services and products.</li>
  </ul>
  5. Protection of personal data.<br /><br />
  We provide the necessary measures to ensure the security of your personal data. The information, provided by you is stored in  secure  servers. Your personal data will be given to the collaborating organizations of the site, if it is necessary for implementation and improvement  of the quality of services(such as receipt of orders, storage, delivery, sending post letters or e-mails, analyzing basic data, marketing services, payment with bank cards, customer service and others).These persons receive the access to information with the purpose of realization of this transactions, and have no right to use them in any other purpose.<br /><br />
  6. Current legislature.<br /><br />
  While using the site you understand that the questions, connected with visiting the site are regulated by the legislature of Republic of Armenia. In case of disputes they are regulated by means of negotiations, disagreements must be solved in a manner, prescribed by law of Republic of Armenia
</>;

const aboutTheProjectText = "Ineed is the electronic system, where you can purchase any product with the best price without a lengthy search. Visit ineed, enter the order and send it. During one day our experts will study the market and give you a price proposal, which you can compare, choose the ideal option for you, and the product will be delivered to your specified address. Also Ineed enables suppliers to find buyers and sell quickly without additional cost, to store imported goods, delivering the goods to the address.";

const howWeWorkText = <>
  <h3>Fill in the information about any product and send us</h3>
  <p>Fill in any written form the name of the product, unit of measure, quantity(on it depends the offered price),technical characteristics; and, pressing “send” realize order. If it is necessary you can attach photo, files, technical drawings and others. If you have ready list of goods you want to order, you can attach it in proper place to gain the time. In the case of big orders it is possible to receive a price offer and possibility of importation from the producer directly.</p>

  <h3>We will calculate the cost of the order within 24 hours</h3>
  <p>After receiving the order our specialists will study the wholesale market for finding more productive options, and, within 24 hours will send you back the offer, which you can accept fully or partially. The purchase can be done by cash, paying directly to courier; online, by one of the pointed means on site; transfer, by invoice.</p>
  
  <h3>Manage your purchase with the help of personal page</h3>
  <p>Personal page on site is personal territory where you can get reliable information on ongoing actions. For entering you must register or sign up in the site, then you will receive total information about your activity on site. You get more privileges, as you see the whole information of your activity and have an opportunity to get quick help and services by Ineed inversely. In general, on your page you can do payments, analyze the statistics of orders and purchases , you did earlier. The archive of purchases will allow you to repeat any operation easily and quickly .One of the privileges is, that you can do necessary amendments with the help of your page, without coming to our office.</p>

  <h3>We will store your goods safely</h3>
  <p>If you have a product, which you don’t use now, we offer it’s full or partial storage in our bulk warehouses. Storage for us is responsibility for the quality and quantity of your goods. Warehousing is; quick receiving of order, counting, monitoring and storage of goods. We guarantee the reliability of goods, due to current 24 hour surveillance cameras. You can remove the goods from warehouse at any time, filling an application in the proper point, and we will deliver your goods to the pointed address quickly.</p>

  <h3>We offer fast and safe delivery of goods</h3>
  <p>The acquired or stored product you can receive from warehouse directly or with the help of delivery service of Ineed. The delivery can take place from the warehouse  of Ineed till your address and in opposite direction during 1 workday. Any user of the site Ineed can be our customer; physical and juridical person; large,  small, medium enterprises. We offer an optimal tariff of delivery system, according which if the amount exceeds the indicated below, delivery is free. In other cases the calculation is carried out according the established price list. The delivery is fulfilled within the terms, indicated by you earlier,  quickly and safely, by the cars, specifically provided for transportation. If your expectations are not justified, we guarantee the return of your goods or the amount paid, within 5 workdays.</p>
</>;

const adventagesText = <>
  <h3>We save your time, money and nerves</h3>
  <p>It is very comfortable, simple and quick using services of ineed, With our help you can arise your purchases level. For any person the most important question in purchases are time, money and nerves. Nobody wants to spend them in vain .The aim of ineed is the detailed studying of the market and presenting the comprehensive information to you before price offering, and, due to it you may take optimal decision or choosing the comfortable version for you.</p>

  <h3>Free analysis of market prices</h3>
  <p>For productive  purchasing the costs reduction is important, which means purchasing of goods with minimum prices. Ineed offers free analysis of market prices. The analyses of market prices allows to follow the dynamics of market changes, giving the customers a possibility of obtaining the goods with minimum prices. It  means that you have an information privilege and an opportunity to lower the prices. We give an opportunity to use the offers of the best suppliers and contracts with special conditions. Our special conditions with the producers and the wholesalers let us offer the customers a wide assortment 0f necessary goods by minimum prices. Due  to elaborated discount system you can be certain that you are reducing the costs, buying the goods with minimum prices. Low prices are formed due to special and exclusive agreements with the suppliers, due to productive logistics of our company.</p>
  
  <h3>We give the opportunity to take advantage of the best offers of suppliers and contracts with special conditions</h3>
  <br /><br />

  <h3>We help the companies to increase the volume and to involve new markets</h3>
  <p>Each enterprise has the aim to increase the sale volumes and involve new markets. Involving the offered wholesale network you have an opportunity to present your goods in all wholesale and retail points of Armenia, as by your own name, and as a trade name, offered by our company. We provide the promotion of trademark, implement advertising by productive and calculated figures. We offer safe storage in our warehouses, saturated with new and safe programs, we have modern rooms, provided for special goods. We organize operational loading and unloading with the help of special professional equipment. This service gives an opportunity  to reduce the costs of warehousing, and makes you sure in full safety.</p>

  <h3>We safely store the prodigal product</h3>
  <br /><br />

  <h3>The delivery is done quickly and safely</h3>
  <p>The delivery is realized by specialized lorries to any place and backwards, during the period from 08.30 till 18.00 .)We offer also 2 delivery packages: “Standart ( delivery is done within 1-2 days, depending upon the distance, ) and quick  (delivery  is done  within 1-2 hours, depending  the distance.) We guarantee safe delivery and provide flexible price policy.</p>
</>;

const deliveryText = <>
  <h3>Delivery</h3>
  <p>We are ready to offer our customers a modern service. We carry out product acceptance and delivery, loading and unloading, packing. We also offer delivery with optimal tariff system, according to which the purchases exceeding the amount set out below will be delivered for free, otherwise there will be calculated according to the price list. Product will be delivered within the time specified by you, quickly and securely, with  special trucks for transportation. We guarantee product safety and safe transportation. If your expectations expectations are not satisfied we guarantee the product return, as well as the return of the amount paid within five working days.</p>

  <h3>Free shipping scale</h3><br />
  <table className="G-simple-table-mobile">
    <tr>
      <td><strong>Delivery address</strong></td>
      <td><strong>Cost (dram)</strong></td>
    </tr>
    <tr>
      <td>Yerevan</td>
      <td>15,000</td>
    </tr>
    <tr>
      <td>regions&lt;50km</td>
      <td>250,000</td>
    </tr>
    <tr>
      <td>regions&lt;100km</td>
      <td>400,000</td>
    </tr>
    <tr>
      <td>regions&lt;200km</td>
      <td>800,000</td>
    </tr>
    <tr>
      <td>regions&lt;300km</td>
      <td>1,200,000</td>
    </tr>
  </table><br /> <br />

  <table className="G-simple-table">
    <tr>
      <td><strong>Delivery address</strong></td>
      <td><strong>Cost (dram)</strong></td>
    </tr>
    <tr>
      <td>Yerevan</td>
      <td>15,000</td>
    </tr>
    <tr>
      <td>regions&lt;50km</td>
      <td>250,000</td>
    </tr>
    <tr>
      <td>regions&lt;100km</td>
      <td>400,000</td>
    </tr>
    <tr>
      <td>regions&lt;200km</td>
      <td>800,000</td>
    </tr>
    <tr>
      <td>regions&lt;300km</td>
      <td>1,200,000</td>
    </tr>
  </table><br /> <br />

  <h3>Established price list of shipping</h3><br />

  <table className="G-simple-table-mobile">
    <tr>
      <td><strong>Town/village</strong></td>
      <td><strong>Cost (dram)</strong></td>
    </tr>
    <tr>
      <td>Yerevan</td>
      <td>500</td>
    </tr>
    <tr>
      <td>Ararat</td>
      <td>5200</td>
    </tr>
    <tr>
      <td>Ptghni</td>
      <td>800</td>
    </tr>
    <tr>
      <td>Megradzor</td>
      <td>5200</td>
    </tr>
    <tr>
      <td>Nubarashen</td>
      <td>1000</td>
    </tr>
    <tr>
      <td>Talin</td>
      <td>5700</td>
    </tr>
    <tr>
      <td>Proshyan (village</td>
      <td>1000</td>
    </tr>
    <tr>
      <td>Hankavan</td>
      <td>6300</td>
    </tr>
    <tr>
      <td>Abovyan</td>
      <td>1100</td>
    </tr>
    <tr>
      <td>Jrashen</td>
      <td>6800</td>
    </tr>
    <tr>
      <td>Zvartnoc</td>
      <td>1100</td>
    </tr>
    <tr>
      <td>Gavar</td>
      <td>7600</td>
    </tr>
    <tr>
      <td>Dzoraghbyur</td>
      <td>1100</td>
    </tr>
    <tr>
      <td>Dilijan</td>
      <td>7700</td>
    </tr>
    <tr>
      <td>Aramus</td>
      <td>1300</td>
    </tr>
    <tr>
      <td>Spitak</td>
      <td>7900</td>
    </tr>
    <tr>
      <td>Arzni</td>
      <td>1300</td>
    </tr>
    <tr>
      <td>Artik</td>
      <td>8200</td>
    </tr>
    <tr>
      <td>Yeghvard</td>
      <td>1300</td>
    </tr>
    <tr>
    <td>Maralik</td>
      <td>8200</td>
    </tr>
    <tr>
      <td>Echmiadzin</td>
      <td>1300</td>
    </tr>
    <tr>
      <td>Areni</td>
      <td>8700</td>
    </tr>
    <tr>
      <td>Masis</td>
      <td>1300</td>
    </tr>
    <tr>
      <td>Azatan</td>
      <td>8900</td>
    </tr>
    <tr>
      <td>Nor Hachn</td>
      <td>1300</td>
    </tr>
    <tr>
    <td>Shirakavan</td>
      <td>9100</td>
    </tr>
    <tr>
      <td>Buregavan</td>
      <td>1500</td>
    </tr>
    <tr>
    <td>Yeghegnadzor</td>
      <td>9600</td>
    </tr>
    <tr>
      <td>Katnaghbyur, Kotayk</td>
      <td>1500</td>
    </tr>
    <tr>
    <td>Khndzoresk</td>
      <td>9600</td>
    </tr>
    <tr>
      <td>Ashtarak</td>
      <td>1600</td>
    </tr>
    <tr>
    <td>Chambarak</td>
      <td>9800</td>
    </tr>
    <tr>
      <td>Nor Geghi</td>
      <td>1600</td>
    </tr>
    <tr>
    <td>Vanadzor</td>
      <td>9800</td>
    </tr>
    <tr>
      <td>Mughni, Ashtarak</td>
      <td>1700</td>
    </tr>
    <tr>
    <td>Akhuryan</td>
      <td>9900</td>
    </tr>
    <tr>
      <td>Lusakert</td>
      <td>1800</td>
    </tr>
    <tr>
    <td>Gyumri</td>
      <td>9900</td>
    </tr>
    <tr>
      <td>Garni</td>
      <td>2000</td>
    </tr>
    <tr>
    <td>Martuni</td>
      <td>10100</td>
    </tr>
    <tr>
      <td>Oshakan</td>
      <td>2000</td>
    </tr>
    <tr>
    <td>Vayk</td>
      <td>10900</td>
    </tr>
    <tr>
      <td>Azatavan</td>
      <td>2100</td>
    </tr>
    <tr>
    <td>Ijevan</td>
      <td>11200</td>
    </tr>
    <tr>
      <td>Artashat</td>
      <td>2100</td>
    </tr>
    <tr>
    <td>Amasia</td>
      <td>11600</td>
    </tr>
    <tr>
      <td>Parpi, Aragatsotn</td>
      <td>2100</td>
    </tr>
    <tr>
    <td>Megrut</td>
      <td>11700</td>
    </tr>
    <tr>
      <td>Gegard</td>
      <td>2300</td>
    </tr>
    <tr>
    <td>Stepanavan</td>
      <td>12300</td>
    </tr>
    <tr>
      <td>Charentsavan</td>
      <td>2600</td>
    </tr>
    <tr>
    <td>Ashotsk</td>
      <td>13000</td>
    </tr>
    <tr>
      <td>Byurakan</td>
      <td>2700</td>
    </tr>
    <tr>
    <td>Vardenis</td>
      <td>13200</td>
    </tr>
    <tr>
      <td>Ujan</td>
      <td>2700</td>
    </tr>
    <tr>
    <td>Tashir</td>
      <td>13700</td>
    </tr>
    <tr>
      <td>Metsamor</td>
      <td>2800</td>
    </tr>
    <tr>
    <td>Jermuk</td>
      <td>14000</td>
    </tr>
    <tr>
      <td>Arzakan</td>
      <td>3100</td>
    </tr>
    <tr>
    <td>Alaverdy</td>
      <td>15100</td>
    </tr>
    <tr>
      <td>Kosh&nbsp;&nbsp;&nbsp; </td>
      <td>3200</td>
    </tr>
    <tr>
    <td>Noyemberyan</td>
      <td>15100</td>
    </tr>
    <tr>
      <td>Bjni</td>
      <td>3300</td>
    </tr>
    <tr>
    <td>Berd</td>
      <td>16700</td>
    </tr>
    <tr>
      <td>Aragats</td>
      <td>3400</td>
    </tr>
    <tr>
    <td>Sisian</td>
      <td>17100</td>
    </tr>
    <tr>
      <td>Aralez</td>
      <td>3400</td>
    </tr>
    <tr>
    <td>Goris</td>
      <td>19700</td>
    </tr>
    <tr>
      <td>Armavir</td>
      <td>3600</td>
    </tr>
    <tr>
    <td>Karvajar</td>
      <td>20000</td>
    </tr>
    <tr>
      <td>Agveran </td>
      <td>3700</td>
    </tr>
    <tr>
    <td>Shushi</td>
      <td>24500</td>
    </tr>
    <tr>
      <td>Hrazdan</td>
      <td>3700</td>
    </tr>
    <tr>
    <td>Kapan</td>
      <td>25300</td>
    </tr>
    <tr>
      <td>Vedi</td>
      <td>3700</td>
    </tr>
    <tr>
    <td>Kajaran</td>
      <td>25900</td>
    </tr>
    <tr>
      <td>Avshar</td>
      <td>3900</td>
    </tr>
    <tr>
    <td>Stepanakert</td>
      <td>26100</td>
    </tr>
    <tr>
      <td>Aparan</td>
      <td>4500</td>
    </tr>
    <tr>
    <td>Askeran</td>
      <td>29300</td>
    </tr>
    <tr>
      <td>Tsakhkadzor</td>
      <td>4900</td>
    </tr>
    <tr>
    <td>Martuni</td>
      <td>30500</td>
    </tr>
    <tr>
      <td>Katnaghbyur, Aragatsotn</td>
      <td>4900</td>
    </tr>
    <tr>
    <td>Megri</td>
      <td>31300</td>
    </tr>
    <tr>
      <td>Melikgyugh,&nbsp; Aragatsotn</td>
      <td>5000</td>
    </tr>
    <tr>
    <td>Martakert</td>
      <td>32500</td>
    </tr>
    <tr>
      <td>Sevan</td>
      <td>5100</td>
    </tr>
    <tr>
    <td>Hadrut</td>
      <td>34900</td>
    </tr>
  </table>

  <table className="G-simple-table">
    <tr>
      <td><strong>Town/village</strong></td>
      <td><strong>Cost (dram)</strong></td>
      <td><strong>Town/village</strong></td>
      <td><strong>Cost (dram)</strong></td>
    </tr>
    <tr>
      <td>Yerevan</td>
      <td>500</td>
      <td>Ararat</td>
      <td>5200</td>
    </tr>
    <tr>
      <td>Ptghni</td>
      <td>800</td>
      <td>Megradzor</td>
      <td>5200</td>
    </tr>
    <tr>
      <td>Nubarashen</td>
      <td>1000</td>
      <td>Talin</td>
      <td>5700</td>
    </tr>
    <tr>
      <td>Proshyan (village</td>
      <td>1000</td>
      <td>Hankavan</td>
      <td>6300</td>
    </tr>
    <tr>
      <td>Abovyan</td>
      <td>1100</td>
      <td>Jrashen</td>
      <td>6800</td>
    </tr>
    <tr>
      <td>Zvartnoc</td>
      <td>1100</td>
      <td>Gavar</td>
      <td>7600</td>
    </tr>
    <tr>
      <td>Dzoraghbyur</td>
      <td>1100</td>
      <td>Dilijan</td>
      <td>7700</td>
    </tr>
    <tr>
      <td>Aramus</td>
      <td>1300</td>
      <td>Spitak</td>
      <td>7900</td>
    </tr>
    <tr>
      <td>Arzni</td>
      <td>1300</td>
      <td>Artik</td>
      <td>8200</td>
    </tr>
    <tr>
      <td>Yeghvard</td>
      <td>1300</td>
      <td>Maralik</td>
      <td>8200</td>
    </tr>
    <tr>
      <td>Echmiadzin</td>
      <td>1300</td>
      <td>Areni</td>
      <td>8700</td>
    </tr>
    <tr>
      <td>Masis</td>
      <td>1300</td>
      <td>Azatan</td>
      <td>8900</td>
    </tr>
    <tr>
      <td>Nor Hachn</td>
      <td>1300</td>
      <td>Shirakavan</td>
      <td>9100</td>
    </tr>
    <tr>
      <td>Buregavan</td>
      <td>1500</td>
      <td>Yeghegnadzor</td>
      <td>9600</td>
    </tr>
    <tr>
      <td>Katnaghbyur, Kotayk</td>
      <td>1500</td>
      <td>Khndzoresk</td>
      <td>9600</td>
    </tr>
    <tr>
      <td>Ashtarak</td>
      <td>1600</td>
      <td>Chambarak</td>
      <td>9800</td>
    </tr>
    <tr>
      <td>Nor Geghi</td>
      <td>1600</td>
      <td>Vanadzor</td>
      <td>9800</td>
    </tr>
    <tr>
      <td>Mughni, Ashtarak</td>
      <td>1700</td>
      <td>Akhuryan</td>
      <td>9900</td>
    </tr>
    <tr>
      <td>Lusakert</td>
      <td>1800</td>
      <td>Gyumri</td>
      <td>9900</td>
    </tr>
    <tr>
      <td>Garni</td>
      <td>2000</td>
      <td>Martuni</td>
      <td>10100</td>
    </tr>
    <tr>
      <td>Oshakan</td>
      <td>2000</td>
      <td>Vayk</td>
      <td>10900</td>
    </tr>
    <tr>
      <td>Azatavan</td>
      <td>2100</td>
      <td>Ijevan</td>
      <td>11200</td>
    </tr>
    <tr>
      <td>Artashat</td>
      <td>2100</td>
      <td>Amasia</td>
      <td>11600</td>
    </tr>
    <tr>
      <td>Parpi, Aragatsotn</td>
      <td>2100</td>
      <td>Megrut</td>
      <td>11700</td>
    </tr>
    <tr>
      <td>Gegard</td>
      <td>2300</td>
      <td>Stepanavan</td>
      <td>12300</td>
    </tr>
    <tr>
      <td>Charentsavan</td>
      <td>2600</td>
      <td>Ashotsk</td>
      <td>13000</td>
    </tr>
    <tr>
      <td>Byurakan</td>
      <td>2700</td>
      <td>Vardenis</td>
      <td>13200</td>
    </tr>
    <tr>
      <td>Ujan</td>
      <td>2700</td>
      <td>Tashir</td>
      <td>13700</td>
    </tr>
    <tr>
      <td>Metsamor</td>
      <td>2800</td>
      <td>Jermuk</td>
      <td>14000</td>
    </tr>
    <tr>
      <td>Arzakan</td>
      <td>3100</td>
      <td>Alaverdy</td>
      <td>15100</td>
    </tr>
    <tr>
      <td>Kosh</td>
      <td>3200</td>
      <td>Noyemberyan</td>
      <td>15100</td>
    </tr>
    <tr>
      <td>Bjni</td>
      <td>3300</td>
      <td>Berd</td>
      <td>16700</td>
    </tr>
    <tr>
      <td>Aragats</td>
      <td>3400</td>
      <td>Sisian</td>
      <td>17100</td>
    </tr>
    <tr>
      <td>Aralez</td>
      <td>3400</td>
      <td>Goris</td>
      <td>19700</td>
    </tr>
    <tr>
      <td>Armavir</td>
      <td>3600</td>
      <td>Karvajar</td>
      <td>20000</td>
    </tr>
    <tr>
      <td>Agveran</td>
      <td>3700</td>
      <td>Shushi</td>
      <td>24500</td>
    </tr>
    <tr>
      <td>Hrazdan</td>
      <td>3700</td>
      <td>Kapan</td>
      <td>25300</td>
    </tr>
    <tr>
      <td>Vedi</td>
      <td>3700</td>
      <td>Kajaran</td>
      <td>25900</td>
    </tr>
    <tr>
      <td>Avshar</td>
      <td>3900</td>
      <td>Stepanakert</td>
      <td>26100</td>
    </tr>
    <tr>
      <td>Aparan</td>
      <td>4500</td>
      <td>Askeran</td>
      <td>29300</td>
    </tr>
    <tr>
      <td>Tsakhkadzor</td>
      <td>4900</td>
      <td>Martuni</td>
      <td>30500</td>
    </tr>
    <tr>
      <td>Katnaghbyur, Aragatsotn</td>
      <td>4900</td>
      <td>Megri</td>
      <td>31300</td>
    </tr>
    <tr>
      <td>Melikgyugh, Aragatsotn</td>
      <td>5000</td>
      <td>Martakert</td>
      <td>32500</td>
    </tr>
    <tr>
      <td>Sevan</td>
      <td>5100</td>
      <td>Hadrut</td>
      <td>34900</td>
    </tr>
  </table>
</>;

const faqTexts = [{
  title: "Return of the goods.",
  description: <>
    Return is made during 14 days from the day of purchase. You can return the good to the office of Ineed. You must present passport and trade cheque.
  </>,
}, {
  title: "Registration",
  description: <>
    <b>How to registrate.</b><br />
    For it press “registration”, fill the fields below, and again press “registration” in the lower section; after filling the line you will receive letter by e-mail for registration activation. It will help you to have your own page, where you later can see the history of your purchases, and, as a regular customer, receive information about news on site.<br /><br />
    <b>Can I register in other systems?</b><br />
    You can register in Facebook, Google+.<br /><br />
    <b>Can I do purchase without registration?</b><br />
    Yes, you can skip field “register” and do the purchase as a guest, but the history of your purchases will not be preserved in the system.<br /><br />
    <b>I have forgotten the password of registration.</b><br />
    Click on the cell “forgot the password” and receive the message on your e-mail.
  </>,
}, {
  title: "Assortment of goods",
  description: <>
    <b>How to find the necessary good.</b><br />
    On the field “what do you need” fill the names of goods, unit of measurement and the number. You may also describe the good and attach photos, files, drawings .Press “to order” and we will study your order, send price offer.<br /><br />
    <b>How to pay.</b><br />
    You can pay; cash, directly to the courier; online, by one of the means of site transfer on the basis of invoices.<br /><br />
    <b>Can I receive the invoice?</b><br />
    In order, to receive the invoice you must note the field “ addition”, or call the number 011200900.<br /><br />
    <b>Can I pay from other country by foreign cards?</b><br />
    The payment can be done anywhere in the world by system IDRAM, VISA, MASTER and ARCA cards(you must have virtual registration).
  </>,
}, {
  title: "Delivery",
  description: <>
    <b>Terms of delivery.</b><br />
    Delivery is done within 1-2 weekdays (from 09.00 till 21.00, except Sunday).<br /><br />
    <b>I want to make delivery some days later.</b><br />
    It is possible when doing purchase on the site; the delivery can be done during 7 days upon your wish; it is necessary to indicate the day and the time of delivery.<br /><br />
    <b>The terms of paid delivery</b><br />
    We offer an optimal price system, according to which purchasing above a certain amount the delivery is free, in other cases the amount will be calculated according the price list. To review the price list visit the site “About us. How we do the delivery.”<br /><br />
    <b>I received the product, and then it turned out that it is damaged or incomplete.</b><br />
    During the delivery it is necessary to check the quality and quantity of the goods (damage, incompleteness), and if there is an error, you must not receive the good, making corresponding record, and, within 1 workday the product will be replaced by  a new one.<br /><br />
  </>,
}];

const specialProductsHelp = <>
  <p>"Alfa Pharm" gives opportunity to his customers to accumulate bonuses purchasing drugs, cosmetics or the other medical products.</p>
  <p>You can have maximum 2 special products and accumulation for it will be 6%.</p>
  <p>Special products can be changed once 3 months, and for children's products - once a month.</p>
  <p>Some products are exceptions and cannot be selected as special products.</p>
</>

export default {
  special_product_confirm: 'Are you sure you want to define this product as special?',
  special_product: "Special product",
  special_products_help: specialProductsHelp,
  expired_text: "Expired",
  expire_text: "Expire",
  price_offer: "ineed price offer",
  card_info_title: 'Ինչ է Ալֆա Քարտը',
  card_info: cardInfo,
  date_new_to_old: "Newest",
  added: "Added",
  verificationCode: "Verification code",
  language_label: "Eng",
  i_need: "I need...",
  wish_list: "Wish list",
  favorites: "Favorites",
  orders: "Orders",
  order_history: "Order history",
  cart: "Cart",
  contact_address: "Armenia, Yerevan, Shirak st 1/68",
  log_in: "Sign in",
  filter: "Filter",
  all_categories: "All categories",
  about_us: "About us",

  about_us_first_1: "Starting from 1996, Alfa-Pharm has been successfully engaged in the import, wholesaling and retailing of medicines in Armenia.",
  about_us_first_2: "The shareholders of the company are \"European Bank for Reconstruction and Development\” (EBRD), and founders with many years of experience in the pharmaceutical market in the Republic of Armenia. Thanks to their professional and organizational skills the company provides high-quality services to the public.",
  about_us_first_3: "Company has straight delivery from leading European and American manufacturers and has positioned itself as a reliable partner of companies such as \"Les Laboratories Servier\”, \"Sanofi-Aventis\”, \"Abbott\”, \"Berlin-Chemie AG”, \"Novartis Consumer\”, \"Bayer Consumer\”, \"Hoffman-La Roche\”, \"Nycomed Austria\”, \"Pfizer\”, etc.",

  about_us_second_1: "",

  about_clinic: 'About our clinic',
  doctor: "Doctor",
  service: "Service",
  services: "Services",
  services_text: "«Ալֆա Ֆարմ» ընկերության մեծածախ վաճառքի բաժնի հիմնական նպատակը ՀՀ բոլոր դեղատներին որակյալ դեղորայքով, հիգիենայի պարագաներով, մանկական սննդով և անհրաժեշտ այլ տեսականիով ապահովելն է: Մենք առաջարկում ենք ծառայություններ հետևյալ առավելություններով`",
  business: "Business",
  become_partner: "Become Partner",
  how_to_become_a_partner: "How to become a partner",
  vacancies: "Vacancies",
  how_to_order_online: "How to order online",
  what_is_alfa_card: "What is Alfa card",
  contact_us: "Leave feedback",
  default: "Default",
  make_default: "Make default",
  copyright: "All Rights Reserved",
  enter_your_phone_number: "Enter the phone number",
  contract: "Contract",
  faq: "Frequently asked questions",
  faq_texts: faqTexts,
  confidentiality_conditions: "Confidentiality conditions",
  products_exchange_and_return: "Products exchange and return",
  download_application: "Download application",
  download_text: "Sign up and get 5000 iBonus",
  not_a_member: "Not a member?",
  sign_up: "Sign up",
  book: "Book",
  email: "Email",
  password: "Password",
  restore_password: "Restore password?",
  social_login: "Social login",
  already_a_member: "Already a member?",
  next: "Next",
  order: "Order",
  fill_your_information: "Fill your information",
  order_checkout: "Check out",
  add: "Add",
  add_credit_card: "+Add a new credit card",
  delete_credit_card: "Do you want to delete the saved card ?",
  what_do_you_need_today: "What do you need today?",
  today: "Today",
  continue_with: (content: string) => `Continue with ${content}`,
  available_days: "Available days",
  create_request: "Create request",
  category: "Category",
  choose: "Choose",
  quantity: "Quantity",
  write: "Write",
  m_u: "M/u",
  description: "Description",
  attach_file: "Attach file",
  phone_number: "Phone number",
  name: "Name",
  surname: "Surname",
  send: "Send",
  add_your_information: "Add your information",
  request_success: "Your request has been sent!",
  basket_save_success: "Basket has been saved",
  order_create_success: "Order created!",
  out_of_stock_delete_confirm: "Marked product is out of stock. Please, remove it for making order. Do you want to remove it?",
  contact_success: "Your message has been sent!",
  personal_data_success: "Personal data has been changed!",
  phone_verify_success: "Phone has been changed!",
  phone_code_send_success: "Verification code has been sent!",
  email_send_success: "Verification link has been sent to written email!",
  checkout_promo_address_error: "Provide address",
  gift_success: "You have a gift of",
  gift: "Gift",
  day_off: "Day off",
  monday: "Mon.",
  tuesday: "Tue.",
  wednesday: "Wed.",
  thursday: "Thu.",
  friday: "Fri.",
  saturday: "Sat.",
  sunday: "Sun.",
  my_orders: "My orders",
  my_requests: "My requests",
  my_companies: "My companies",
  my_registrations: "Appointements",
  medical_history: "Medical history",
  special_products: "Special products",
  special_products_replace_fail: (date: string) => `You can replace the product only after ${date}`,
  my_wallet: "My wallet",
  my_addresses: "My addresses",
  addresses: "Addresses",
  log_out: "Log Out",
  add_new_address: "+ Add new address",
  add_address: "Add address",
  edit_address: "Edit address",
  save: "Save",
  save_cart: "Save cart",
  saved_carts: "Saved carts",
  default_address: "Default address",
  full_name: "Full Name",
  first_name: "First name",
  last_name: "Last name",
  message: "Message",
  write_a_message: "Write a message",
  promotions: "Promotions",
  address: "Address",
  house: "House",
  apartment: "Apartment",
  building: "Building",
  entrance: "Entrance",
  floor: "Floor",
  contact_text: contactText,
  contract_text: contractText,
  exchange_return_text: exchangeReturnText,
  confidentiality_conditions_text: confidentialityConditionsText,
  deciphered_prescription: "Deciphered prescription",
  deciphered: "Deciphered",
  edit: "Edit",
  remove: "Remove",
  edit_company: "Edit company",
  add_company: "Add company",
  add_new_company: "+ Add new company",
  tin: "TIN",
  billing_address: "Billing address",
  delivery_address: "Delivery address",
  contact_person: "Contact person",
  add_other_address: "+ Add other address",
  company_name: "Company name",
  my_account: "My account",
  form: "Form",
  only_files: "Only files",
  only_files_request_text: "If you don't have time to complete the request, you can attach the existing files.",
  about_the_project: "About the project",
  how_we_work: "How we work",
  career_apply_success: "Your application has been successfully submitted.",
  the_advantages_of_cooperation: "The advantages of cooperation",
  city: "City",
  region: "State",
  delivery: "Delivery",
  delivery_fee: "Delivery fee",
  bonus_card: "Bonus card",
  mobile_app: "Mobile app",
  about_delivery_text: "Delivery of the products purchased form the online drugstore of Alfa Pharm is available in Yerevan and Gyumri and generally takes up to 2 hours since the registration of the order. In regions the delivery is organized either thorugh mailing company “Haypost” generally in up to 3 days by delivering the products to the respective Haypost branch, where the customer can take his/her order, or through Alfa-Pharm generally in up to 3 days by delivering the products to the nearest Alfa-Pharm branch, where the customer can take his/her order. More details are available in the “Delivery conditions” section.",
  about_bonus_card_text: "Alfa Pharm bonus card lets customers accumulate bonus points from the purchases in Alfa Pharm drugstores, add prepaid amount to their account and then spend them when pruchasing from Alfa Pharm. More details are available in “Alfa card conditions” section.",
  about_mobile_app_text: "Alfa Pharm mobile app provides a fast access to the online drugstore. Your bonus card will always be with you as it will be available in the app, you can make orders from the online drugstore through just a few taps, see the map of drugstores, see the product assortment and use lots of other useful features.",
  about_mobile_app_text_2: "The mobile application can be downloaded from Play Market or App Store by searching for “Alfa Pharm” or by scanning one of the following QR codes.",
  about_the_project_text: aboutTheProjectText,
  how_we_work_text: howWeWorkText,
  adventages_text: adventagesText,
  delivery_text: deliveryText,
  for_partners: "For partners",
  invitation_to_cooperate: "Invitation to cooperate",
  partners_account_login: "Partners account login",
  help_for_partners: "Help for partners",
  follow_us: "Follow us",
  facebook: "Facebook",
  instagram: "Instagram",
  linked_in: "LinkedIn",
  language: "Language",
  ineed_app: "ineed app",
  change_password: "Change password",
  personal_data: "Personal information",
  save_changes: "Save changes",
  verification: "Verification",
  verification_text: "Please type the verification code",
  ok: "OK",
  or: "or",
  send_again: "Send again",
  features: "Features",
  additional_sales: "Additional sales",
  get: "get",
  off: "discount",
  discount: "Discount",
  and: "and",
  i_bonus: "iBonus",
  bonus: "Bonus",
  days: "day(s)",
  go_to_checkout: "Go to checkout",
  buy: "Buy",
  add_to_cart: "Add to cart",
  add_to_cart_short: "Add to cart",
  lists: "Lists",
  active: "Active",
  completed: "Completed",
  request_forms: "Request form(s)",
  request_files: "Request file(s)",
  finished: "Finished",
  delivered: "Finished",
  canceled: "Canceled",
  pending: "Pending",
  failed:'Failed',
  attached_to_carrier: 'Pending',
  confirmed_by_branch_admin: 'Pending',
  not_completed: 'Pending',
  ready_to_start:  'Collected',
  started: 'Ongoing',
  success: "Finished",
  success_book: "Thank you! Your registration request has been approved. You can follow the status of your appointement in the 'My appointements' section of your Personal page.",
  best_selling: "Best selling",
  new_products: "New Products",
  alphabetical_a_z: "Alphabetical A - Z",
  alphabetical_z_a: "Alphabetical Z - A",
  price_low_to_high: "Price: Low to high",
  price_high_to_low: "Price: High to low",
  discount_low_to_high: "Discount: Low to high",
  empty_blogs_list: 'Blogs list is empty',
  empty_price_list: 'Price list is empty',
  empty_doctors_list: 'Doctors list is empty',
  discount_high_to_low: "Discount: High to low",
  buy_again: "Buy again",
  price: "Price",
  brands: "Manufacturers",
  brand: "Manufacturer",
  producers: "Countries",
  producer: "Country",
  active_ingredients: "Active ingredients",
  active_ingredient: "Active ingredient",
  min: "Min",
  max: "Max",
  clear_filters: "Clear Filters",
  clear_all: "Clear all",
  as_soon_as_possible: "As soon as possible",
  date: "Date",
  created_date: "Created date",
  end_date: "End date",
  sender: "Sender",
  add_new_list: "+ Add new list",
  payer: "Payer",
  pay: "Pay",
  add_list: "Add list",
  edit_list: "Edit list",
  i: "I",
  edit_invited_list: "Edit Invited List",
  leave_wish_list: "Leave Wish List",
  delete: "Delete",
  no_options: "No options",
  no_companies: "No companies",
  new: "+ New",
  owner: "Owner",
  no_lists: "No lists",
  choose_all_attributes: "Choose all attributes",
  requested_products: "Requested product(s)",
  filter_for_users: "Filter for users",
  my: "My",
  copy: "Copy",
  copied_to_clipboard: "Copied to clipboard",
  url: "URL",
  confirm_description: "You need to confirm this action",
  confirm: "Confirm",
  choose_address: "Choose address",
  choose_pharmacy: "Choose pharmacy",
  choose_time: "Choose time",
  asap: "As soon as possible",
  choose_date: "Choose date",
  user_request_ask: "ask(s) to add the following item to this list",
  apply_online: "Apply online",
  prescription: "Prescription",
  prescriptions: "Prescriptions",
  add_prescription: "Add prescription",
  medical_institution: "Medical institution",
  upload_image: "Upload an image",
  upload_prescription_image: "Upload prescription",
  upload: "Upload",
  cancel: "Cancel",
  total: "Total",
  subtotal: "Subtotal",
  promo_discount: "Promo discount",
  points: "Points",
  user_points: "Points",
  checkout: "Checkout",
  type: "Type",
  pricing: "Pricing",
  additionally: "Additionally",
  comment: "Comment",
  address_comment: "Address comment",
  yes: 'Yes',
  empty_card_list: 'Card list is empty',
  no: 'No',
  bonus_count: 'Bonus count',
  retail_sale: "Retail sale",
  wholesale_sale: "Wholesale sale",
  wholesale_promotions: "Wholesale promotions",
  useful_links: "Useful links",
  about_company: "About company",
  information: "Information",
  empty_orders_list: 'Orders list is empty',
  empty_special_products: 'Special products list is empty',
  empty_address_list: 'Address list is empty',
  empty_prescriptions_list: 'Prescriptions list is empty',
  empty_tenders_list: 'Tenders list is empty',
  contact: "Contact",
  last_search_results: "Last Search Results",
  products: "Products",
  product: "Product",
  empty_favorites_list: 'Favorites list is empty',
  empty_carts_list: 'Carts list is empty',
  empty_registrations_list: 'Registrations list is empty',
  empty_medical_history: 'Medical history list is empty',
  buy_bundle_promotion: "Buy attached products together and get bonuses.",
  see_more: "See more",
  pickup: "Pick up from Pharmacy",
  sale: "Sale",
  sort_by: "Sort by",
  show_all: "Show all",
  search: "Search",
  search_results: "Search results",
  stuff: "Stuff",
  popular_categories: "Popular categories",
  cash: "Cash",
  i_pay: "IPay",
  post_terminal: "POS-terminal",
  idram: "Idram",
  talcell: "Telcell",
  card: "Credit Card",
  answer_text: "You answered",
  bank_transfer: "Bank transfer",
  delivery_date: "Delivery date",
  pickup_date: "Pick up date",
  footer_text: `"Alfa Pharm" is the biggest chain of pharmacies locating in many regions of Armenia.`,
  order_a_call: "Order a call",
  invite: "Invite",
  use_the_link: "Use the link",
  done: "Done",
  order_number: "Order ID",
  status: "Status",
  repeat: "Repeat",
  payment_method: "Payment type",
  product_deleted_warning: "The product has been deleted!",
  all_products: "All products",
  are_you_sure: "Are you sure?",
  are_you_sure_cancel_order: "Are you sure you want to cancel the order?",
  mark_as_read: "Mark as read",
  written: "Written",
  confirm_new_password: "Confirm new password",
  confirm_password: "Confirm password",
  current_password: "Current password",
  new_password: "New password",
  choose_password: "Choose password",
  similar: "Similar",
  similar_products: "Similar products",
  sign_up_confirm: <>I agree with <a target="_blank" role="noreferrer" href={ROUTES.EXCHANGE_RETURN}>Terms &amp; conditions</a> and <a target="_blank" role="noreferrer" href={ROUTES.CONFIDENTIALITY_CONDITIONS}>Privacy policy</a></>,
  reason: "Reason",
  show_more: "Show more",
  read_more: "Read more",
  promo_code: "Promo code",
  apply: "Apply",
  special_offers: "Special offers",
  additional_sale_label: (fromCount: number) => `Buy ${fromCount} and more,`,
  checkout_i_bonus_can_use: (bonus: number, points: number): string => `You can use ${bonus} ${Settings.translations.i_bonus} from your ${points}`,
  receiving_bonus: "Received iBonus",
  use_bonus_points: "Use bonus points",
  used_bonus: "Used bonus",
  gained_bonus: "Gained bonus",
  no_products: "No products",
  no_addresses: "No addresses",
  no_orders: "No orders",
  no_requests: "No requests",
  no_notifications: "No notifications",
  categories: "Categories",
  pharmacies: "Pharmacies",
  online_pharmacy: "Online pharmacy",
  online_sales: "Online sales",
  log_out_question: 'Are you sure you want to sign out?',
  clear_basket: 'Clear basket',
  no_search_result: 'No search result',
  clinic: "Clinic",
  doctors: "Doctors",
  laboratory: "Laboratory",
  item: 'item',
  order_canceled: 'Order was canceled successfully',
  cancel_order: 'Do you want to cancel this order?',
  basket_at_least_2000: "The cost of online order should be more than 2000 AMD.",
  delete_saved_product_basket: 'Do you want to delete the saved basket?',
  delete_product: 'Delete product',
  delete_product_from_basket: 'Are you sure you want to delete this product?',
  delete_basket: 'Delete basket',
  delete_all_baskets: 'Are you sure you want to delete the whole basket?',
  price_list: "Price list",
  blog: "Blog",
  news: "News",
  package: 'Package',
  tenders: "Tenders",
  order_a_call_success: "Your request has successfully been sent. Our operator will connect with you as soon as possible.",
  order_success: "Thanks, your order has been confirmed. You can see the details of the order in the order history section.",
  guest_order_success: 'Thanks, your order has been confirmed. Register in the system of Alfa Pharm and accumulate bonuses by making orders from online pharmacy.',
  prescription_success: "Thank you! The request of your prescription has been confirmed. Prescription will be reviewed and we'll send you the list of medicines as soon as possible.",
  appointment_success: "Thank you. Your registration request has been accepted. You can follow the status in the My registrations section of your personal profile.",
  availability_at_the_nearest_pharmacy: "Availability at the nearest pharmacy",
  good_morning: "Good morning",
  out_of_stock: "Out of stock",
  home: "Home page",
  wrong_password_length: 'Password should contain at least 6 characters',
  good_afternoon: "Good afternoon",
  good_evening: "Good evening",
  show_less: "Show less",
  get_my_order: "Get my order",
  treatment: "Treatment",
  get_my_order_text: "Please, write your email and code for getting your order details",
  code: "Code",
  notifications: "Notifications",
  insttallApp: "Download app",
  installationBonuses: "Sign up and get 5000 iBonus",
  install: "Install",
  success_partner: 'Partner was created successfully',
  message_sent: 'Your message was successfully sent.',
  email_or_phone: "Email or phone number",
  send_request:"Send request",
  privacy_policy : "Privacy policy",
  terms_of_use: "Terms of use",
  businnes_description: "At ineed, we are committed to working with our clients to deliver the results needed to grow their business. Send us request and become our partner",
  wrong_email: 'Wrong email',
  wrong_password: 'Wrong password',
  passwords_do_not_match: 'Passwords do not match',
  draft: 'Draft',
  please_check_correctness_of_email_or_phone_number: 'Please check correctness of email or phone number',
  gender: 'Gender',
  date_of_birth: 'Date of birth',
  pay_with_credit_card: "Pay with credit card",
  male: 'Male',
  female: 'Female',
  not_filled: 'Not filled',
  open: 'Open',
  closed: 'Closed',

  notification_texts: {
    request_failed: {
      title: "Your request failed",
      body: "Sorry, but we could not find Your requested",
    },
    request_succeeded: {
      title: "Your request succeed",
      body: "Click to see found product's details",
    },
    order_canceled: {
      title: "Your order is canceled",
      body: "Tap to see details",
    },
    order_finished: {
      title: "Your order is finished",
      body: "Tap to see details and get bonuses",
    },
    order_idram_failed: {
      title: "Payment failed",
    },
    wish_list_delete: {
      title: "Wish list was deleted",
      body: "Oops, one of your wish lists was deleted by its creator",
    },
    wish_list_leave: {
      title: "Member left from wish list",
      body: "Oops, member left from your wish list",
    },
    wish_list_new_product: {
      title: "New product",
      body: "The new product has been added to the  shopping list",
    },
    wish_list_remove_product: {
      title: "Product removed",
      body: "The product has been removed from the wish list",
    },
    wish_list_product_request: {
      title: "Product add",
      body: "Member wants to add a new product to the wish list",
    },
    wish_list_unapprove: {
      title: "Product Rejection",
      body: "Requested product has been rejected in wish list",
    },
    wish_list_approve: {
      title: "Product approvement",
      body: "Requested product has been approved in wish list",
    },
    wish_list_kick: {
      title: "Your request failed",
      body: "Oops, you were deleted from wish list by it's creator",
    },
    wish_list_new_member: {
      title: "Wish list membership",
      body: "A new member has joined the shopping list",
    },
  },
};
