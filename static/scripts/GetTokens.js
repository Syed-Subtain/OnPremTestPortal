async function GetTokens(workflowCtx, portal) {
    return {
      "Step 1": {
        name: "Get Access Token",
        stepCallback: async () => {
          return workflowCtx.showContent(`## Introduction
  This guided walkthrough showcases how to get access token and session token to use Verizon APIs. 
  
  ## Getting Started
  
  In order to use Verizon APIs, you need to obtain a ThingSpace Token programmatically. 
  
  ### Steps to generate ThingSpace Token programmatically
  
  1. Sign in to [thingspace.verizon.com](https://thingspace.verizon.com).
  2. Click on your login icon (in the upper right corner) and from the drop-down select "Key Management". Below is the direct links to the Key Management page:
   - ThingSpace Developer Portal Users [click here](https://thingspace.verizon.com/profile/key-management.html)
  3. Copy the Client ID and the Client Secret and store them for use.
  4. Go to the *step 2*,  \`Get Session Token\`.
  
  ![Auth GIF](./static/images/Guided-Walkthrough/Authentication/thingspace-auth.gif)
  
  `);
      },
    },
    "Step 2": {
      name: "Get Session Token",
      stepCallback: async (stepState) => {
        await portal.setConfig((defaultConfig) => {
          console.log(defaultConfig)
          return {
            ...defaultConfig,
            auth:{
              ...defaultConfig.auth,
              thingspace_oauth:{
                ...defaultConfig.auth["thingspace_oauth"],
                OAuthClientId:"d69cf016-2b4b-4349-882e-6c755bc0424f",
                OAuthClientSecret:"f660a4c2-e63f-4756-af6b-803569ff4ba5"
              },
              "VZ-M2M-Token": {
                ...defaultConfig.auth["VZ-M2M-Token"],
                "VZ-M2M-Token": "tester",
              }
            }
          }
        });
        return workflowCtx.showEndpoint({
          description:`### Description
This endpoint initiates a Connectivity Management session and returns a VZ-M2M session token that is required in subsequent API requests. Please see **Step 1** for details.

### Steps

1. Click on the Authentication Section Below.
2. Add the copied Client ID to \`OAuth Client ID\` and Client Secret to \`Oauth Client Secret\` field. 
3. Click on the \`Get Token\` Button. 
4. Once the Authorization is successful, You can close the Authentication Section.
5. Now enter your \`username\` and \`password\` and click on \`Try it Out\` button in order to get the session token.
6. Once the session token call is successful, the \`VZ-M2M-Token\` will be saved in the Authentication section and will be used in all the future API calls.
`,
          endpointPermalink:
            "$e/Session%20Management/StartConnectivityManagementSession",
            args:{
              body:{
                username:"TestAPIUser",
                password:"Verizon*1"
              }
            },
          verify: (response, setError) => {
            if (response.StatusCode == 401 || response.StatusCode == 400) {
              setError("Authentication Token is Required");
              return false;
            } else if (response.StatusCode == 200) {
              return true;
            } else {
              setError(
                "API Call wasn't able to get a valid response. Please try again."
              );
              return false;
            }
          },
        });
      },
    },
    "Finish": {
      name: "What's Next",
      stepCallback: async (stepState) => {
          const step2State = stepState?.["Step 2"];
          await portal.setConfig((defaultConfig) => {
            console.log(defaultConfig)
            return {
              ...defaultConfig,
              showFullCode:true,
              auth: {
                ...defaultConfig.auth,
                "VZ-M2M-Token": {
                  ...defaultConfig.auth["VZ-M2M-Token"],
                  "VZ-M2M-Token": step2State.data?.sessionToken,
                }
              },
            };
          });
          return workflowCtx.showContent(`## Have a look at some other Guided Walkthroughs

Here are some popular use cases

| Title | Description | Action |
| --- | --- | --- |
| How to Activate a Device | This guided walkthrough showcases how to use Verizon API to activate a device. | **[Try Now](page:guided-walkthroughs/activateDevice-walkthrough)** |
| How to Get Device Location | This guided walkthrough showcases how to use Verizon API to Get Device Location. | **[Try Now](page:guided-walkthroughs/getDeviceLocation-walkthrough)** |
| How to Get Device Usage | This guided walkthrough showcases how to use Verizon API to get device usage. | **[Try Now](page:guided-walkthroughs/deviceUsageHistory-walkthrough)** |
| How to Fetch Regions | This guided walkthrough showcases how to use Verizon API to fetch the list of 5G Edge Regions. | **[Try Now](page:guided-walkthroughs/getRegions-walkthrough)** |
| How to Fetch Device Information | This guided walkthrough showcases how to use Verizon API to fetch the Device Information List. | **[Try Now](page:guided-walkthroughs/fetchDeviceList-walkthrough)** |
| How to Fetch Device Usage History | This guided walkthrough showcases how to use Verizon API to fetch the Device Information List. | **[Try Now](page:guided-walkthroughs/deviceUsageHistory-walkthrough)** |
| How to do 4G/5G Address Validation | This guided walkthrough showcases how to use Verizon API for 4G/5G Address validation. | **[Try Now](page:guided-walkthroughs/day0/4G5GAddressValidation)** |
| How to Activate Service For a Device | This guided walkthrough showcases how to use Verizon API to activate a device. | **[Try Now](page:guided-walkthroughs/day0/ActivateServiceForDevice)** |
| How to Register for DiagnosticService Callback Service | This guided walkthrough showcases how to use Verizon API to register a callback listener URL. | **[Try Now](page:guided-walkthroughs/day0/RegisterDiagnosticServiceCallbackService)** |
| How to do SIM Secure Assignment | This guided walkthrough showcases how to use Verizon API to assign SIM-Secure for IoT Licenses. | **[Try Now](page:guided-walkthroughs/day0/SIMSecureAssignment)** |
| How to do Site Proximity | This guided walkthrough showcases how to use Verizon API for Site Proximity. | **[Try Now](page:guided-walkthroughs/day1/SiteProximity)** |
| How to determine Network Conditions | This guided walkthrough showcases how to use Verizon API to determine near real-time network conditions. | **[Try Now](page:guided-walkthroughs/day1/NetworkConditions)** |
| How to Get RF Strength Baseline | This guided walkthrough showcases how to use Verizon API to Get RF strength baseline. | **[Try Now](page:guided-walkthroughs/day1/GetRFStrengthBaseline)** |
| How to Register For Outages | This guided walkthrough showcases how to use Verizon API to register for outages. | **[Try Now](page:guided-walkthroughs/day1/RegisterForOutages)** |
| How to Verify Network Location | This guided walkthrough showcases how to use Verizon API to verify network location. | **[Try Now](page:guided-walkthroughs/dayN/VerifyNetworkLocation)** |
| How to Get Experience Score | This guided walkthrough showcases how to use Verizon API to get experience score. | **[Try Now](page:guided-walkthroughs/dayN/GetExperienceScore)** |
| How to do Fota Upgrade | This guided walkthrough showcases how to use Verizon API to schedule a firmware upgrade for devices. | **[Try Now](page:guided-walkthroughs/dayN/FotaUpgrade)** |

      `);
      },
    },
  };
}
