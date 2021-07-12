import { createTransport } from "nodemailer";

// Create a new nodemailer transporter. This takes in a config object containing the service, host and auth details.
const transporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Send an email to customer.
export const sendEmail = async (customerEmail, order) => {
  // Use the transporter to send an email.
  const mailResult = await transporter.sendMail({
    from: process.env.MAIL_USERNAME,
    to: customerEmail,
    headers: {
      priority: "medium",
    },
    subject: "Payment Successful",
    html: `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional //EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd' />
<html
  lang='en'
  xmlns='http://www.w3.org/1999/xhtml'
  xmlns:v='urn:schemas-microsoft-com:vml'
  xmlns:o='urn:schemas-microsoft-com:office:office'
>
  <head> </head>
  <head>
    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <meta name='x-apple-disable-message-reformatting' />
    <!--[if !mso]><!-->
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <!--<![endif]-->
    <style type='text/css'>
      * {
        text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      html {
        height: 100%;
        width: 100%;
      }

      body {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        mso-line-height-rule: exactly;
      }

      div[style*='margin: 16px 0'] {
        margin: 0 !important;
      }

      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      .ReadMsgBody,
      .ExternalClass {
        width: 100%;
      }

      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }
    </style>
    <!--[if gte mso 9]>
      <style type='text/css'>
        li {
          text-indent: -1em;
        }
        table td {
          border-collapse: collapse;
        }
      </style>
    <![endif]-->
    <title>Payment Successful</title>
    <!-- content -->
    <!--[if gte mso 9
      ]><xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml><!
    [endif]-->
  </head>
  <body class='body' style='background-color: #ffffff; margin: 0; width: 100%'>
    <div
      class='preview'
      style='
        color: #ffffff;
        display: none;
        font-size: 1px;
        line-height: 1px;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
        mso-hide: all;
      '
    >
     Your payment was successful.!&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
    </div>
    <table
      class='bodyTable'
      role='presentation'
      width='100%'
      align='left'
      border='0'
      cellpadding='0'
      cellspacing='0'
      style='width: 100%; background-color: #ffffff; margin: 0'
      bgcolor='#FFFFFF'
    >
      <tr>
        <td
          class='body__content'
          align='left'
          width='100%'
          valign='top'
          style='
            color: #000000;
            font-family: Helvetica, Arial, sans-serif;
            font-size: 16px;
            line-height: 20px;
          '
        >
          <div
            class='container'
            style='margin: 0 auto; max-width: 600px; width: 100%'
          >
            <!--[if mso | IE]>
            <table class='container__table__ie' role='presentation' border='0' cellpadding='0' cellspacing='0' style='margin-right: auto; margin-left: auto;width: 600px' width='600' align='center'>
              <tr>
                <td> <![endif]-->
            <table
              class='container__table'
              role='presentation'
              border='0'
              align='center'
              cellpadding='0'
              cellspacing='0'
              width='100%'
            >
              <tr class='container__row'>
                <td
                  class='container__cell'
                  width='100%'
                  align='left'
                  valign='top'
                >
                  <h1
                    class='header h1'
                    style='
                      margin: 20px 0;
                      line-height: 40px;
                      font-family: Helvetica, Arial, sans-serif;
                      color: #6f00ff;
                    '
                  >
                    Hello,Your Payment Was Successful
                  </h1>
                  <p
                    class='text p'
                    style='
                      display: block;
                      margin: 14px 0;
                      color: #000000;
                      font-family: Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      line-height: 20px;
                    '
                  >
                    Your payment was processed successfuly for the following
                    items
                  </p>
                  <ul
                    class='text ul'
                    style='
                      margin-left: 20px;
                      margin-top: 16px;
                      margin-bottom: 16px;
                      padding: 0;
                      list-style-type: disc;
                      color: #000000;
                      font-family: Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      line-height: 20px;
                    '
                  >
                    ${order.items
                      .map((itemGroup) => {
                        const [item] = itemGroup;

                        return `<li
                      class='text li'
                      style='
                        color: #000000;
                        font-family: Helvetica, Arial, sans-serif;
                        font-size: 16px;
                        line-height: 20px;
                      '
                    >
                      <p
                        class='text p'
                        style='
                          display: block;
                          margin: 14px 0;
                          color: #000000;
                          font-family: Helvetica, Arial, sans-serif;
                          font-size: 16px;
                          line-height: 20px;
                        '
                      >
                        ${item.name}
                      </p>
                      <img
                        src='${item.image}'
                        alt='${item.name}'
                        border='0'
                        class='img__block'
                        style='display: block; max-width: 100%'
                      />
                      <p
                        class='text p'
                        style='
                          display: block;
                          margin: 14px 0;
                          color: #000000;
                          font-family: Helvetica, Arial, sans-serif;
                          font-size: 16px;
                          line-height: 20px;
                        '
                      >
                        ${itemGroup.length} units each at <small>USD</small> <b>${item.price}</b>
                      </p>
                    </li>`;
                      })
                      .join("")}
                    
                  </ul>
                  <div class='hr' style='margin: 0 auto; width: 100%'>
                    <!--[if mso | IE]>
                          <table class='hr__table__ie' role='presentation' border='0' cellpadding='0' cellspacing='0' style='margin-right: auto; margin-left: auto; width: 100%;' width='100%' align='center'>
                            <tr>
                              <td> <![endif]-->
                    <table
                      class='hr__table'
                      role='presentation'
                      border='0'
                      align='center'
                      cellpadding='0'
                      cellspacing='0'
                      width='100%'
                      style='table-layout: fixed'
                    >
                      <tr class='hr__row'>
                        <td
                          class='hr__cell'
                          width='100%'
                          align='left'
                          valign='top'
                          style='border-top: 1px solid #9a9a9a'
                        >
                          &nbsp;
                        </td>
                      </tr>
                    </table>
                    <!--[if mso | IE]> </td>
                            </tr>
                          </table> <![endif]-->
                  </div>
                </td>
              </tr>
            </table>
            <!--[if mso | IE]> </td>
              </tr>
            </table> <![endif]-->
          </div>
        </td>
      </tr>
    </table>
    <div
      style='
        display: none;
        white-space: nowrap;
        font-size: 15px;
        line-height: 0;
      '
    >
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    </div>
  </body>
</html>
`,
  });

  return mailResult;
};
