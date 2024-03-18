async function ActivateDevice(workflowCtx, portal) {
  return {
    "Step 1": {
      name: "Register Callback",
      stepCallback: async (stepState) => {
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        if (
          window.location.origin == "https://staging.thingspace.verizon.com"
        ) {
          mockurl = "https://mock-staging.thingspace.verizon.com/webhook";
        } else {
          mockurl = "https://mock.thingspace.verizon.com/webhook";
        }
        return workflowCtx.showEndpoint({
          description: `### Description
This step registers a URL at which an account receives asynchronous responses and other messages from a ThingSpace Platform callback service. The messages are REST messages. You are responsible for creating and running a listening process on your server at that URL to receive and parse the messages.`,
          endpointPermalink: "$e/Connectivity%20Callbacks/RegisterCallback",
          args: {
            aname: "0642078588-00001",
            body: {
              name: "CarrierService",
              url: mockurl,
            },
          },
          verify: (response, setError) => {
            if (response.StatusCode != 200) {
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
      name: "List registered callbacks",
      stepCallback: async (stepState) => {
        const step3State = stepState?.["Step 1"];
        const accountName = step3State?.data?.accountName;
        const callbackURL =
          "https://mock-staging.thingspace.verizon.com/display?accountName=" +
          accountName;
        window.open(callbackURL, "_blank");
        await portal.setConfig((defaultConfig) => {
          console.log(defaultConfig);
          return {
            ...defaultConfig,
            showFullCode:true,
            environment: "Dev",
            auth: {
              ...defaultConfig.auth,
              thingspace_oauth: {
                ...defaultConfig.auth["thingspace_oauth"],
                OAuthClientId: "df",
                OAuthClientSecret: "f",
                OAuthScopes: "discovery:read",
              },
              "VZ-M2M-Token": {
                ...defaultConfig.auth["VZ-M2M-Token"],
                "VZ-M2M-Token": "tester",
              },
            },
          };
        });
        return workflowCtx.showEndpoint({
          description: `### Description
In this step we will call this endpoint to get the name and endpoint URL of the callback listening services registered for our account.
Check the output of this to confirm if CarrierService callback is registered successfully.`,
          endpointPermalink:
            "$e/Connectivity%20Callbacks/ListRegisteredCallbacks",
          args: {
            aname: accountName,
          },
          verify: (response, setError) => {
            if (response.StatusCode != 200) {
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
    "Step 3": {
      name: "List Device Information",
      stepCallback: async (stepState) => {
        const step3State = stepState?.["Step 1"];
        const accountName = step3State?.data?.accountName;
        await portal.setConfig((defaultConfig) => {
          console.log(defaultConfig)
          return{
          ...defaultConfig,
        }});
        return workflowCtx.showEndpoint({
          description: `### Description
  This step returns information about a single device or information about all devices that match the given parameters. The returned information includes device provisioning state, service plan, MDN, MIN, and IP address.
  Check the output of this to ensure device is NOT already active.`,
          endpointPermalink: "$e/Device%20Management/ListDevicesInformation",
          args: {
            body: {
              accountName: accountName,
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
    "Step 4": {
      name: "Check Devices Availability for Activation",
      stepCallback: async (stepState) => {
        const step3State = stepState?.["Step 1"];
        const accountName = step3State?.data?.accountName;
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: `### Description
  This step returns information about whether specified devices are registered by the manufacturer with the Verizon network and are available to be activated.
  Check the output of this to ensure device is available to activate.`,
          endpointPermalink:
            "$e/Device%20Management/CheckDevicesAvailabilityForActivation",
          args: {
            body: {
              accountName: accountName,
            },
          },
          verify: (response, setError) => {
            if (response.StatusCode != 200) {
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
    "Step 5": {
      name: "Activate a device",
      stepCallback: async (stepState) => {
        const step3State = stepState?.["Step 1"];
        const accountName = step3State?.data?.accountName;
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: `### Description
  This API is used to activate service for devices. If the devices do not already exist in the account, this API resource adds them before activation.`,
          endpointPermalink: "$e/Device%20Management/ActivateServiceForDevices",
          args: {
            body: {
              accountName: accountName,
            },
          },
          verify: (response, setError) => {
            if (response.StatusCode != 200) {
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
    "Step 6": {
      name: "List Device Information",
      stepCallback: async (stepState) => {
        const step3State = stepState?.["Step 1"];
        const accountName = step3State?.data?.accountName;
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description: `### Description
  This step returns information about a single device or information about all devices that match the given parameters. The returned information includes device provisioning state, service plan, MDN, MIN, and IP address.
  Check the output of this to confirm that the device shows as activated.`,
          endpointPermalink: "$e/Device%20Management/ListDevicesInformation",
          args: {
            body: {
              accountName: accountName,
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
    Finish: {
      name: "What's Next",
      stepCallback: async () => {
        return workflowCtx.showContent(`## Have a look at some other Guided Walkthroughs

Here are some popular use cases

| Title | Description | Action |
| --- | --- | --- |
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
