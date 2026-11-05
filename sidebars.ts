// Generated once from the `nav:` of the pre-migration en/mkdocs.yml (commit 13dc014, since deleted).
// The migration tooling is not part of this repository: edit this file by hand from now on.
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Get Started',
      className: 'sidebar-section-icon-get-started',
      collapsed: true,
      items: [
        {type: 'doc', id: 'get-started/open-banking', label: 'Open Banking'},
        {type: 'doc', id: 'get-started/open-banking-requirements', label: 'Open Banking Requirements'},
        {type: 'doc', id: 'get-started/regulations-and-standards', label: 'Regulations and Standards'},
        {type: 'doc', id: 'get-started/wso2-open-banking-uk-toolkit', label: 'WSO2 Open Banking UK Toolkit'},
        {type: 'doc', id: 'get-started/about-this-release', label: 'About this Release'},
        {
          type: 'category',
          label: 'Quick Start Guide',
          items: [
            {type: 'doc', id: 'get-started/quick-start-guide', label: 'Get Started'},
            {type: 'doc', id: 'get-started/set-up-toolkits', label: 'Set up Toolkits'},
            {type: 'doc', id: 'get-started/configure-users-and-roles', label: 'Configure Users and Roles'},
            {type: 'doc', id: 'get-started/configure-sms-otp-authenticator', label: 'Configure SMS OTP Authenticator'},
            {type: 'doc', id: 'get-started/dynamic-client-registration', label: 'Dynamic Client Registration'},
            {type: 'doc', id: 'get-started/try-out-flow', label: 'Tryout Flow'},
            {type: 'doc', id: 'get-started/data-publishing-try-out', label: 'Data Publishing'},
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Install and Setup',
      className: 'sidebar-section-icon-install-and-setup',
      collapsed: true,
      items: [
        {type: 'doc', id: 'install-and-setup/prerequisites', label: 'Prerequisites'},
        {type: 'doc', id: 'install-and-setup/setting-up-servers', label: 'Setting up servers'},
        {type: 'doc', id: 'install-and-setup/setting-up-databases', label: 'Setting up databases'},
        {type: 'doc', id: 'install-and-setup/configuring-identity-server-for-ob', label: 'Configuring Identity Server'},
        {type: 'doc', id: 'install-and-setup/configuring-api-manager-for-ob', label: 'Configuring API Manager'},
        {type: 'doc', id: 'install-and-setup/configuring-users-and-roles', label: 'Configuring Users and Roles'},
        {type: 'doc', id: 'install-and-setup/configuring-sms-otp-authenticator', label: 'Configuring SMS OTP Authenticator'},
        {type: 'doc', id: 'install-and-setup/upgrading-the-solution', label: 'Upgrading the solution'},
      ],
    },
    {
      type: 'category',
      label: 'Learn',
      className: 'sidebar-section-icon-learn',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Consent Management',
          items: [
            {type: 'doc', id: 'learn/consent-management', label: 'Introduction'},
            {type: 'doc', id: 'learn/consent-manager', label: 'Consent Manager'},
          ],
        },
        {type: 'doc', id: 'learn/consent-authorization-intro', label: 'Consent Authorization'},
        {type: 'doc', id: 'learn/token-authentication', label: 'Token Authentication'},
        {
          type: 'category',
          label: 'Dynamic Client Registration',
          items: [
            {type: 'doc', id: 'learn/dynamic-client-registration', label: 'Introduction'},
            {type: 'doc', id: 'learn/dynamic-client-registration-configuration', label: 'Configuration'},
          ],
        },
        {
          type: 'category',
          label: 'Strong Customer Authentication',
          items: [
            {type: 'doc', id: 'learn/strong-customer-authentication', label: 'Introduction'},
            {type: 'doc', id: 'learn/app-to-app-redirection', label: 'App-to-App Redirection'},
          ],
        },
        {
          type: 'category',
          label: 'API Specifications',
          items: [
            {type: 'doc', id: 'learn/api-specifications', label: 'Introduction'},
            {type: 'doc', id: 'learn/account-and-transaction-api', label: 'Account and Transaction API'},
            {type: 'doc', id: 'learn/payment-initiation-api', label: 'Payment Initiation API'},
            {type: 'doc', id: 'learn/confirmation-of-funds-api', label: 'Confirmation of Funds API'},
            {
              type: 'category',
              label: 'Variable Recurring Payments',
              items: [
                {type: 'doc', id: 'learn/variable-recurring-payments', label: 'Introduction'},
                {type: 'doc', id: 'learn/variable-recurring-payments-configuration', label: 'Configuration'},
              ],
            },
            {
              type: 'category',
              label: 'Event Notification API',
              items: [
                {type: 'doc', id: 'learn/event-notification-api', label: 'Introduction'},
                {type: 'doc', id: 'learn/event-notification-configuration', label: 'Configuration'},
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'API Security',
          items: [
            {type: 'doc', id: 'learn/api-security', label: 'Introduction'},
            {type: 'doc', id: 'learn/api-security-configuration', label: 'Configuration'},
          ],
        },
        {
          type: 'category',
          label: 'Data Publishing',
          items: [
            {type: 'doc', id: 'learn/data-publishing', label: 'Introduction'},
            {type: 'doc', id: 'learn/data-publishing-reports', label: 'Generate Reports'},
            {type: 'doc', id: 'learn/data-publishing-configuration', label: 'Configuration'},
          ],
        },
        {type: 'doc', id: 'learn/integration-with-bank', label: 'Integration with Bank'},
      ],
    },
    {
      type: 'category',
      label: 'Try out',
      className: 'sidebar-section-icon-try-out',
      collapsed: true,
      items: [
        {type: 'doc', id: 'try-out/dynamic-client-registration-flow', label: 'TPP Onboarding'},
        {type: 'doc', id: 'try-out/account-and-transaction-flow', label: 'Account and transaction flow'},
        {type: 'doc', id: 'try-out/payment-initiation-flow', label: 'Payment Initiation flow'},
        {type: 'doc', id: 'try-out/confirmation-of-funds-flow', label: 'Confirmation of Funds flow'},
        {type: 'doc', id: 'try-out/variable-recurring-payments-flow', label: 'Variable Recurring Payments flow'},
        {type: 'doc', id: 'try-out/consent-manager', label: 'Consent Manager'},
        {type: 'doc', id: 'try-out/event-notification-api', label: 'Event Notification API'},
      ],
    },
    {
      type: 'category',
      label: 'Conformance',
      className: 'sidebar-section-icon-conformance',
      collapsed: true,
      items: [
        {type: 'doc', id: 'conformance/functional-conformance-suite', label: 'Functional Conformance Suite'},
      ],
    },
  ],
};

export default sidebars;
