WSO2 Open Banking UK Toolkit is a purpose-built solution for regulatory compliance that supports PSD2. Instead of 
building an open banking solution from scratch, you can use WSO2 Open Banking UK Toolkit to meet all open 
banking requirements with additional benefits beyond compliance. This toolkit runs on top of the following WSO2 products:

- WSO2 Open Banking Accelerator 3.0
- WSO2 Identity Server 5.11.0
- WSO2 API Manager 4.0.0
- WSO2 Streaming Integrator 4.0.0

!!! note
    The WSO2 Open Banking UK Toolkit is built by customizing the WSO2 Open Banking Accelerator and helps you 
    comply with the Open Banking Standard. For more information on the accelerator, see 
    the [WSO2 Open Banking Accelerator Documentation](https://ob.docs.wso2.com/).

The toolkit mainly addresses the open banking requirements such as API consumer application onboarding, consent 
management, and access authorization among numerous other features to set up an open banking solution. 

!!! tip
    In a standalone setup, these products are deployed in a single server. However, in a typical production environment, 
    it is recommended to deploy the components in separate servers (distributed) for better performance.

## Product Matrix

Given below is a product matrix for different versions of WSO2 Open Banking UK Toolkit:

| Version | Mandatory Components | Additional Components |
| --------| ---------------------| ----------------------|
| 1.0.0 | wso2-obam-toolkit-uk-1.0.0 <br/> wso2-obiam-toolkit-uk-1.0.0 | wso2-obbi-toolkit-uk-1.0.0 |

## Prerequisites for a Deployment

Listed below are the prerequisites for a successful deployment:

### Hardware requirements 

<table>
   <tbody>
      <tr>
         <th>Disk space</th>
         <td>
            40 GB free disk space <br/> The disk space is based on the expected storage requirements that are calculated by considering the file uploads and the backup policies.
         </td>
      </tr>
      <tr>
         <th>CPU</th>
         <td>
            Minimum required: 2 cores
         </td>
      </tr>
      <tr>
         <th>Memory</th>
         <td>
            4 GB RAM
         </td>
      </tr>
   </tbody>
</table>

### Software requirements

<table>
   <tbody>
      <tr>
         <th>Operating system</th>
         <td>
            <ul>
               <li>Windows </li>
               <li>Linux </li>
               In a production deployment, it is recommended that WSO2 products are installed on the latest releases of RedHat Enterprise Linux or Ubuntu Server LTS. 
               <br/> <br/>
               See the following documentation to find the environments that the WSO2 products are tested with:
               <ul>
                  <li> <a href="https://ob.docs.wso2.com/en/latest/install-and-setup/prerequisites/#prerequisites-for-a-deployment">Open Banking Accelerator compatibility</a></li>
                  <li> <a href="https://is.docs.wso2.com/en/5.9.0/setup/environment-compatibility/">Identity Server compatibility</a></li>
                  <li> <a href="https://apim.docs.wso2.com/en/latest/install-and-setup/setup/reference/product-compatibility/">API Manager compatibility</a></li>
               </ul>
            </ul>
         </td>
      </tr>
      <tr>
         <th>JDK Version</th>
         <td>
            <ul>
               <li>Oracle JDK 11</li>
            </ul>
         <td>  
      </tr>
      <tr>
         <th>DBMS</th>
         <td>
            <ul>
               <li>MySQL 8.0</li>
               <li>Oracle 19c</li>
               <li>Microsoft SQL Server 2017</li>
               <li> PostgreSQL 13</li>
            </ul>
            We do not recommend configuring the H2 database in the production environment.
         <td>   
      </tr>
      <tr>
         <th> User store</th>
         <td> It is not recommended to use Apache DS in a production environment due to scalability issues. Instead, use an LDAP such as OpenLDAP, RDBMS, Active Directory or custom user stores for user management.</td>
      </tr>
   </tbody>
</table>

## Compatibility 

WSO2 Open Banking UK Toolkit 1.0.0 is supported on the following platforms:

<table>
   <tbody>
      <tr>
         <th>Supported JDK versions</th>
         <td>
            <ul>
               <li>
                  Oracle JDK 11
               </li>
               <li>
                  OpenJDK 11
               </li>
            </ul>
         </td>
      </tr>
      <tr>
         <th>Supported Operating Systems</th>
         <td>
            <ul>
               <li>
                  Ubuntu 18.04.5 LTS
               </li>
               <li>
                  Windows Server 2016
               </li>
            </ul>
         </td>
      </tr>
      <tr>
         <th>Tested DBMSs</th>
         <td>
            <ul>
               <li>
                  MySQL 8.0
               </li>
               <li>
                  Oracle 19c
               </li>
               <li>
                  Microsoft SQL Server 2017
               </li>
               <li>
                  PostgreSQL 13
               </li>
            </ul>
         </td>
      </tr>
      <tr>
         <th>Tested Web Browsers</th>
         <td>
            <ul>
               <li>
                  Google Chrome 69
               </li>
               <li>
                  Firefox 88.0
               </li>
            </ul>
         </td>
      </tr>
   </tbody>
</table>

If you have difficulty in setting up any WSO2 product in a specific platform or database,
[contact us](https://wso2.com/subscription/).