---
sidebar_position: 3
title:  Validating peripheral devices for RBA
---
RBA supports the following peripheral devices when accessing web apps from the remote browser:
1. **Signature pad**
2. **Webcam**
3. **Thermal printer**
4. **Image scanner**
5. **Card reader**
6. **Pin pad**

WUPOS agents are required to configure the supported peripheral devices to ensure they are automatically detected and functional in RBA. 

To verify the functionality of your connected devices, use the **Peripheral Validator**: 
   
- Navigate to the **Peripherals** in the homepage and click **Connect** for the **Peripherals**  menu to start the validation process for each device. 
   
  ![workspaces-homepage](/img/runbook-images/workspaces-homepage.png)

- It displays all the supported peripheral devices that can be validated.

  ![peripherals](/img/runbook-images/peripherals-validator.png)

## **Printer**

To validate the printer:
1. Click the **Test** button for **Printer** from the **Peripherals** screen. It displays a colored page to test the printer.

   ![test-printer](/img/runbook-images/validate-printer.png)

3. Click on **Test Printer** and add a virtual PDF printer to verify that it is accessible from the remote browser.
4. Select “**See more**..” from the **Destination** options on the print screen to check if the printer (Peripheral1-Printer) is listed. 

   ![save-printer](/img/runbook-images/printer-save.png)

5. Select the printer and print the test page.
6. Alternatively, connect your printer device and confirm that it shows in the list of printers. Select the printer and print the test page.


## **Signature Pad**

To validate the signature pad:
1. Click the **Connect** button for **Signature Pad** from the **Peripherals** screen. It displays a signature pad validator.

   ![sig-pad](/img/runbook-images/signature-pad.png)

2. Click **Capture**, connect your signature pad device, and start signing. The Signature Capture window displays the signature as you sign.

    ![sig-capture](/img/runbook-images/signature-capture.png)

3. After signing, Click **OK** from the Signature Capture window. The signature is displayed on the validator screen.
4. Click the **Erase** button to remove the existing signature. 


## **Card Reader**

To validate the card reader, continue with the following steps:
1. Click the **Test** button for **Card Reader** from the **Peripherals** screen. It displays a card reader validator with an input box.

   ![card-reader](/img/runbook-images/card-reader.png)

3. Connect your card reader device. Set your cursor on the input box and swipe your card. The card details are displayed on the screen.

## **Image Scanner**

To validate the image scanner, continue with the following steps:
1. Click the **Test** button for **Image Scanner** from the **Peripherals** screen. It displays the image scanner validator.
