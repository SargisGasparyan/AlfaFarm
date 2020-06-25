import * as React from 'react';

import ROUTES from 'platform/constants/routes';
import Settings from 'platform/services/settings';

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

const businessText = <>
  <ul>
    <li>We fully do the supply organization and purchases of your company.</li>
    <li>Our workers not only receive your order, but watch each order from purchase till delivery.</li>
    <li>Our team fully collects all documents of your purchases.</li>
  </ul>
  Our company has agreements and contracts  with many producers and sellers, which you can use , being the member of our team. Including the offered  by us wholesale trade network, you will have a chance of presenting your goods in all wholesale and retail points, as under your own name  and under the trade name, offered by our company.
  We provide the promotion of trade marks, advertising and productive calculating. We are ready to offer our customers modern services, such as receiving the goods, delivery, loading and unloading, packaging.
  Do you want to avoid unnecessary costs with the state of employee and conducting the trainings.
  Signing a contract with us you get:
  <ul>
    <li>Organization of process of complete getting of the necessary goods, beginning from the order till the delivery</li>
    <li>Document turnover</li>
    <li>Possibility of using our discounts</li>
    <li>Possibility of getting the goods by wholesale prices</li>
    <li>Free analysis of market prices</li>
    <li>Options for lower prices</li>
    <li>We provide catalogs and samples of goods.</li>
  </ul>
  If you are interested in our services, call the number 011200900 or write by e-mail <a href="mailto:business@ineed.am">business@ineed.am</a>, and our workers will answer you politely.
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

export default {
  price_offer: "ineed price offer",
  date_new_to_old: "Newest",
  added: "Added",
  verificationCode: "Verification code",
  language_label: "Eng",
  i_need: "I need...",
  wish_list: "Wish list",
  cart: "Cart",
  log_in: "Sign in",
  filter: "Filter",
  all_categories: "All categories",
  about_us: "About us",
  business: "Business",
  become_partner: "Become Partner",
  vacancy: "Vacancy",
  contact_us: "Contact us",
  copyright: "ineed.am All Rights Reserved",
  contract: "Contract",
  faq: "FAQ",
  faq_texts: faqTexts,
  confidentiality_conditions: "Confidentiality conditions",
  products_exchange_and_return: "Products exchange and return",
  download_app: "Download the App",
  download_text: "Sign up and get 5000 iBonus",
  not_a_member: "Not a member?",
  sign_up: "Sign up",
  email: "Email",
  password: "Password",
  restore_password: "Restore password?",
  social_login: "Social login",
  already_a_member: "Already a member?",
  next: "Next",
  order: "Send request",
  add: "+ Add",
  what_do_you_need_today: "What do you need today?",
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
  order_create_success: "Order created!",
  contact_success: "Your message has been sent!",
  personal_data_success: "Personal data has been changed!",
  phone_verify_success: "Phone has been changed!",
  phone_code_send_success: "Verification code has been sent!",
  email_send_success: "Verification link has been sent to written email!",
  checkout_promo_address_error: "Provide address",
  gift_success: "You have a gift of",
  my_orders: "My orders",
  my_requests: "My requests",
  my_companies: "My companies",
  my_addresses: "My addresses",
  log_out: "Log Out",
  add_new_address: "+ Add new address",
  add_address: "Add address",
  edit_address: "Edit address",
  save: "Save",
  default_address: "Default address",
  full_name: "Full Name",
  message: "Message",
  promotions: "Promotions",
  address: "Address",
  house: "House",
  apartment_office: "Apartment/Office",
  contact_text: contactText,
  business_text: businessText,
  contract_text: contractText,
  exchange_return_text: exchangeReturnText,
  confidentiality_conditions_text: confidentialityConditionsText,
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
  the_advantages_of_cooperation: "The advantages of cooperation",
  delivery: "Delivery",
  bonus_card: "Bonus card",
  mobile_app: "Mobile app",
  about_delivery_text: "«Ալֆա Ֆարմ» դեղատների ցանցը բաղկացած է 170-ից ավել դեղատներից, այդպիսով հանդիսանալով հանրապետությունում ամենամեծ և աշխարհագրորեն սփռված ցանցը:",
  about_bonus_card_text: "«Ալֆա Ֆարմ» դեղատների ցանցը բաղկացած է 170-ից ավել դեղատներից, այդպիսով հանդիսանալով հանրապետությունում ամենամեծ և աշխարհագրորեն սփռված ցանցը:",
  about_mobile_app_text: "Ներբեռնեք <<Ալֆա Ֆարմ>>-ի բջջային հավելվածը և օգտվեք մեր ծառայություններից ավելի հեշտ և արագ",
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
  personal_data: "Personal data",
  save_changes: "Save changes",
  verification: "Verification",
  verification_text: "Please type verification code sent to",
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
  days: "day(s)",
  go_to_checkout: "Go to checkout",
  add_to_cart: "Add to cart",
  add_to_cart_short: "Add to cart",
  lists: "Lists",
  active: "Active",
  completed: "Completed",
  request_forms: "Request form(s)",
  request_files: "Request file(s)",
  finished: "Finished",
  canceled: "Canceled",
  pending: "Pending",
  best_selling: "Best selling",
  new_products: "New Products",
  price_low_to_high: "Price: Low to high",
  price_high_to_low: "Price: High to low",
  discount_low_to_high: "Discount: Low to high",
  discount_high_to_low: "Discount: High to low",
  price: "Price",
  brands: "Brands",
  min: "Min",
  max: "Max",
  clear_filters: "Clear Filters",
  date: "Date",
  sender: "Sender",
  add_new_list: "+ Add new list",
  payer: "Payer",
  add_list: "Add list",
  edit_list: "Edit list",
  i: "I",
  invite: "Invite",
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
  user_request_ask: "ask(s) to add the following item to this list",
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
  products: "Products",
  see_more: "See more",
  pickup: "Pickup",
  sale: "Sale",
  sort_by: "Sort by",
  show_all: "Show all",
  search: "Search",
  popular_categories: "Popular categories",
  cash: "Cash",
  card: "Card",
  bank_transfer: "Bank transfer",
  delivery_date: "Delivery date",
  pickup_date: "Pickup date",
  done: "Done",
  order_id: "Order ID",
  status: "Status",
  repeat: "Repeat",
  payment_method: "Payment method",
  product_deleted_warning: "The product has been deleted!",
  all_products: "All products",
  are_you_sure: "Are you sure?",
  written: "Written",
  confirm_password: "Confirm password",
  choose_password: "Choose password",
  similar: "Similar",
  sign_up_confirm: <>I agree with <a target="_blank" role="noreferrer" href={ROUTES.EXCHANGE_RETURN}>Terms &amp; conditions</a> and <a target="_blank" role="noreferrer" href={ROUTES.CONFIDENTIALITY_CONDITIONS}>Privacy policy</a></>,
  reason: "Reason",
  show_more: "Show more",
  promo_code: "Promo code",
  apply: "Apply",
  additional_sale_label: (fromCount: number) => `Buy ${fromCount} and more,`,
  checkout_i_bonus_can_use: (bonus: number, points: number): string => `You can use ${bonus} ${Settings.translations.i_bonus} from your ${points}`,
  receiving_bonus: "Received iBonus",
  no_products: "No products",
  no_addresses: "No addresses",
  no_orders: "No orders",
  no_requests: "No requests",
  no_notifications: "No notifications",
  categories: "Categories",
  pharmacies: "Pharmacies",
  clinic: "Clinic",
  blog: "Blog",
  news: "News",
  good_morning: "Good morning",
  home: "Home page",
  good_afternoon: "Good afternoon",
  good_evening: "Good evening",
  show_less: "Show less",
  get_my_order: "Get my order",
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
  privacy_policy : "By proceeding, you are agreeing to the terms of use and acknowledging the privacy policy",
  businnes_description: "At ineed, we are committed to working with our clients to deliver the results needed to grow their business. Send us request and become our partner",
  wrong_email: 'Wrong email',
  wrong_password: 'Wrong password',
  passwords_do_not_match: 'Passwords do not match',
  draft: 'Draft',
  please_check_correctness_of_email_or_phone_number: 'Please check correctness of email or phone number',
  

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
