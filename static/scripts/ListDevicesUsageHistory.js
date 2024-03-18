async function ListDeviceUsageHistory(workflowCtx, portal) {
  return {
    "Step 1": {
      name: "Get the Required Device Information",
      stepCallback: async (stepState) => {
        await portal.setConfig((defaultConfig) => {
          return {
            ...defaultConfig
          };
        });
        return workflowCtx.showEndpoint({
          description:`### Description
This step fetches the list of devices that will be used in the next step. In order to fetch the usage history in **Step 2**, the device details are required. The details (Device ID and Kind) of the first Device in the API response will be transferred to the next step.`,
          endpointPermalink: "$e/Device%20Management/ListDevicesInformation",
          args: {
            body: {
              accountName:"0642078588-00001",
              deviceId:{
                id:"865284040050589",
                kind: "IMEI"
              }
            },
          },
          verify: (response, setError) => {
            if (response.StatusCode != 200 && response.StatusCode != 202) {
              setError("Please Try Again. Unable to find the API Spec");
              return false;
            } else {
              return true;
            }
          },
        });
      },
    },
    "Step 2": {
      name: "List Device Usage History",
      stepCallback: async (stepState) => {
        const step3State = stepState?.["Step 1"];
        const { id, kind } =
          step3State?.data?.devices?.[0]?.deviceIds?.[0] || {};

        await portal.setConfig((defaultConfig) => {
          return {
            ...defaultConfig
          };
        });
        return workflowCtx.showEndpoint({
          description: `### Description
  In this last step, based on the fetched device ID, the usage history is fetched. 
  
  In order to fetch the usage history of any other device on your account, please update the \`deviceId\` objective in the API Playground.`,
          endpointPermalink: "$e/Device%20Management/ListDevicesUsageHistory",
          args: {
            body: {
              deviceId: {
                id: id,
                kind: kind,
              },
            },
          },
          verify: (response, setError) => {
            if (response.StatusCode != 200 && response.StatusCode != 202) {
              setError(
                "API Call wasn't able to get a valid response. Please try again."
              );
              return false;
            } else {
              return true;
            }
          },
        });
      },
    },
    "Finish": {
      name: "What's Next",
      stepCallback: async () => {
        return workflowCtx.showContent(`## Have a look at some other Guided Walkthroughs

Here are some popular use cases

| Title | Description | Action |
| --- | --- | --- |
| How to Activate a Device | This guided walkthrough showcases how to use Verizon API to activate a device. | **[Try Now](page:guided-walkthroughs/activateDevice-walkthrough)** |
| How to Get Device Location | This guided walkthrough showcases how to use Verizon API to Get Device Location. | **[Try Now](page:guided-walkthroughs/getDeviceLocation-walkthrough)** |
| How to Get Device Usage | This guided walkthrough showcases how to use Verizon API to get device usage. | **[Try Now](page:guided-walkthroughs/deviceUsageHistory-walkthrough)** |
| How to Fetch Regions | This guided walkthrough showcases how to use Verizon API to fetch the list of 5G Edge Regions. | **[Try Now](page:guided-walkthroughs/getRegions-walkthrough)** |
| How to Fetch Device Information | This guided walkthrough showcases how to use Verizon API to fetch the Device Information List. | **[Try Now](page:guided-walkthroughs/fetchDeviceList-walkthrough)** |
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
