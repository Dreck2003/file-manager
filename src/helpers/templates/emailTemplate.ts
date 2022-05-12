
/**
 * 
 * @param name User name
 * @param url Redirection URL
 * @returns Template HTML for sendEmail
 */
export const ForgotPassHtml = (
  name: string,
  url: string
): string => {
    return(`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body
    style="
      min-height: 100vh;
      padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: sans-serif;
    "
  >
    <main class="container" style="width: 70%;
        height: 100%;
        margin: 0% 15%;
        padding: 2em 1em;
        border: 1px solid #6191b3;">
      <h2 class="title" style="display: block;
        margin-bottom: 1em;
        color: #515d66;">HELLO ${name},</h2>
      <p style="font-size: 1.1em;
        color: #8196a5;
        font-weight: 600;
        margin: 1.2em 0;">
        If you have forgotten your password and want to recover your account,
        click on the button:
      </p>
      <div class="container-button" style="width: 100%;
        align-items: center;
        justify-content: center;
        margin: 2em 0px;">
        <a href=${url} target="_blank" class="button" style="padding: 1em 1.4em;
        color: white;
        background-color: #6191b3;
        margin: 1em 0em;
        text-decoration: none;"
          >Reset Password</a
        >
      </div>
      <span class="copy" style="color: #8196a5;
        font-weight: 500;">
        Or copy and paste this url in the browser
        <a href=${url} target="_blank" class="copy-link" style="color: blue;
        text-decoration: none;"
          >${url}</a
        >
      </span>
    </main>
  </body>
</html>

    `);
};
