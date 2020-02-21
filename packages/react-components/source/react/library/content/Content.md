## Overview

The `Content` component allows you to place formatted text within your application. This provides a reasonable default for text formatting in text-heavy pages, such as documentation, legal documents, and inline help.

_Note: Styling is limited to elements available in markdown._

## Basic Use

The `Content` component is a wrapper for simple HTML content, which provides default styling for common elements like text, links, headers, lists, code, blockquotes, tables, and images when semantically tagged (i.e. features in Markdown).

### Example #1

```jsx
<Content>
  <div className="main-container">
    <div className="main-container-children">
      <h3>Deploy a Gatsby site to Google Cloud Platform with Terraform</h3>
      <p>
        This sample workflow deploys a simple Gatsby site to Google Cloud
        Platform (GCP). The workflow provisions a Google Kubernetes Engine (GKE)
        cluster on GCP using Terraform, and deploys the app to the cluster.
      </p>
      <p>
        The workflow should appear on the <strong>Workflows</strong> page in
        your Nebula web interface. If you don't see it there, add the workflow
        from our{' '}
        <a
          href="https://github.com/puppetlabs/nebula-workflow-examples/tree/master/example-workflows/gke-provision-and-deploy-workflow"
          target="_blank"
          rel="noopener noreferrer"
        >
          examples repo
        </a>{' '}
        on GitHub.
      </p>
      <h4>Prerequisites</h4>
      <p>
        Before you run the workflow, make sure you have access to the following:
      </p>
      <ul>
        <li>
          <p>
            A Slack authentication token. For more information, see{' '}
            <a
              href="https://get.slack.help/hc/en-us/articles/215770388-Create-and-regenerate-API-tokens"
              target="_blank"
              rel="noopener noreferrer"
            >
              Getting a Slack token
            </a>
            .
          </p>
        </li>
        <li>
          <p>A GCP project</p>
        </li>
        <li>
          <p>A GCP service account with the following permissions:</p>
          <ul>
            <li>
              <p>Cloud KMS Admin</p>
            </li>
            <li>
              <p>Compute Admin</p>
            </li>
            <li>
              <p>Kubernetes Engine Admin</p>
            </li>
            <li>
              <p>Kubernetes Engine Cluster Admin</p>
            </li>
            <li>
              <p>Editor</p>
            </li>
            <li>
              <p>Role Administrator</p>
            </li>
            <li>
              <p>Security Admin</p>
            </li>
            <li>
              <p>Service Networking Admin</p>
            </li>
            <li>
              <p>Source Repository Administrator</p>
            </li>
            <li>
              <p>Storage Admin</p>
            </li>
            <li>
              <p>Storage Object Admin</p>
            </li>
          </ul>
          <blockquote>
            <p>
              For more information on creating a service account, see{' '}
              <a
                href="https://cloud.google.com/iam/docs/creating-managing-service-accounts"
                target="_blank"
                rel="noopener noreferrer"
              >
                Creating and managing service accounts
              </a>
              .
            </p>
          </blockquote>
        </li>
        <li>
          <p>
            Your GCP service account key. Encode the key using the base64
            encoding scheme. For more information on creating a service account
            key, see{' '}
            <a
              href="https://cloud.google.com/iam/docs/creating-managing-service-account-keys#iam-service-account-keys-create-gcloud"
              target="_blank"
              rel="noopener noreferrer"
            >
              Creating and managing service account keys
            </a>
            .
          </p>
        </li>
        <li>
          <p>
            Make sure you've enabled Google Cloud's{' '}
            <a
              href="https://cloud.google.com/iam/reference/rest/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Identity and Access Management (IAM) API
            </a>
          </p>
        </li>
        <li>
          <p>
            Make sure you've enabled Google Cloud's{' '}
            <a
              href="https://cloud.google.com/kubernetes-engine/docs/reference/rest/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kubernetes Engine API
            </a>
          </p>
        </li>
      </ul>
      <h4>Run the workflow</h4>
      <p>Follow these steps to run the workflow:</p>
      <ol>
        <li>
          <p>
            Add your Slack authentication token to the workflow as a secret.
          </p>
          <ol>
            <li>
              <p>
                Click <strong>Edit</strong> &gt; <strong>Secrets</strong>.
              </p>
            </li>
            <li>
              <p>
                Click <strong>Define new secret</strong> and use the following
                values:
              </p>
              <ul>
                <li>
                  <p>
                    <strong>KEY</strong>: <code>slacktoken</code>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>VALUE</strong>: Enter your Slack authentication
                    token
                  </p>
                </li>
              </ul>
            </li>
          </ol>
        </li>
        <li>
          <p>Add your GCP service account key as a secret.</p>
          <ol>
            <li>
              <p>
                Click <strong>Edit</strong> &gt; <strong>Secrets</strong>.
              </p>
            </li>
            <li>
              <p>
                Click <strong>Define new secret</strong> and use the following
                values:
              </p>
              <ul>
                <li>
                  <p>
                    <strong>KEY</strong>: <code>credentials</code>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>VALUE</strong>: Enter your base64 encoded GCP
                    service account key
                  </p>
                </li>
              </ul>
            </li>
          </ol>
        </li>
        <li>
          <p>Configure your workflow parameters.</p>
          <ol>
            <li>
              <p>
                Click <strong>Run</strong> and enter the following parameters:
              </p>
              <ul>
                <li>
                  <p>
                    <strong>project</strong>: Enter the name of your GCP project
                  </p>
                </li>
                <li>
                  <p>
                    <strong>slack_channel</strong>: Enter the name of the Slack
                    channel you'd like to notify when the workflow completes.
                    For example, <code>#nebula-workflows</code>.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>slack_message</strong>: Enter a message for the
                    Slack notification. For example,{' '}
                    <code>
                      K8s cluster successfully provisioned with Nebula!
                    </code>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>terraform_state_bucket</strong>: The name of the
                    Google Storage bucket where Terraform stores its state. The
                    name must be globally unique.
                  </p>
                </li>
              </ul>
            </li>
          </ol>
        </li>
        <li>
          <p>
            Click <strong>Run workflow</strong> and wait for the workflow run
            page to appear.
          </p>
        </li>
      </ol>
      <h4>Open the Gatsby site in a browser</h4>
      <p>To find the URL for your Gatsby site:</p>
      <ol>
        <li>
          <p>
            From your GCP console, click <strong>Kubernetes Engine</strong> &gt;{' '}
            <strong>Services and Ingress</strong>.
          </p>
        </li>
        <li>
          <p>
            Copy the endpoint for <strong>nebula-example</strong> and paste the
            URL into a browser.
          </p>
        </li>
      </ol>
      <p>
        Congratulations! You've deployed an application to GCP using Terraform.
      </p>
      <p>
        <strong>Useful topics:</strong>
      </p>
      <ul>
        <li>
          <p>
            For more information on our curated step specifications, see{' '}
            <a href="/documentation/step-specifications">Step specifications</a>.
          </p>
        </li>
        <li>
          <p>
            If your team uses Microsoft teams, try the{' '}
            <a href="/documentation/step-specifications/msteams-notification">
              Microsoft Teams notification
            </a>{' '}
            step.
          </p>
        </li>
      </ul>
      <p>
        <img src="https://storage.googleapis.com/nebula-docs/stage/example-workflows/gke-provision-and-deploy-workflow.png" />
      </p>
    </div>
  </div>
</Content>
```

### Example #2

```jsx
const example1 = `      steps:

      ...

      - name: k8s-provisioner
      image: projectnebula/k8s-provisioner:latest
      spec:
        provider: gcp
        project: my-project
        clusterName: my-cluster
        credentials:
          gcpServiceAccountFile:
            $type: Secret
            name: credentials
        stateStoreName: my-bucket
        masterCount: 1
        nodeCount: 3
        zones:
        - "us-west-2a"
        region: us-west2`;
const example2 = `kubeconfig-file:
      $type: Output
      name: kubeconfig-file
      taskName: k8s-provisioner`;

<Content>
  <div className="main-container">
    <div className="main-container-children">
      <h3>Kubernetes provisioner</h3>
      <p>
        The Kubernetes provisioner step container creates and manages Kubernetes
        clusters in cloud platforms.
      </p>
      <blockquote>
        <p>
          <strong>Note</strong>: This task provisions resources in your cloud
          platform account. Deploying infrastructure creates real resources and
          could incur a charge from your cloud provider.
        </p>
      </blockquote>
      <p>Current supported platforms:</p>
      <ul>
        <li>
          <p>Google Cloud Platform (GCP)</p>
        </li>
        <li>
          <p>Amazon Web Services (AWS)</p>
        </li>
      </ul>
      <h4>Specifications</h4>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Child setting</th>
            <th>Data type</th>
            <th>Description</th>
            <th>Default</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>provider</code>
            </td>
            <td>&nbsp;</td>
            <td>string</td>
            <td>
              The cloud provider to use. Use <code>aws</code> or{' '}
              <code>gcp</code>.
            </td>
            <td>None</td>
            <td>True</td>
          </tr>
          <tr>
            <td>
              <code>project</code>
            </td>
            <td>&nbsp;</td>
            <td>string The GCP project ID.</td>
            <td>None</td>
            <td>True for GCP</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>
              <code>clusterName</code>
            </td>
            <td>&nbsp;</td>
            <td>string</td>
            <td className="increased-min-width">
              A name for your cluster. This must be a fully qualified domain
              name (FQDN). You can use a root domain in route53 or GCP domain
              name service (DNS), or you can set the domain to{' '}
              <code>k8s.local</code> if you don't want to use one of your roots.
            </td>
            <td>None</td>
            <td>True</td>
          </tr>
          <tr>
            <td>
              <code>credentials</code>
            </td>
            <td>&nbsp;</td>
            <td>mapping</td>
            <td>A map of credentials used for platform authentication.</td>
            <td>None</td>
            <td>True</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>
              <code>gcpServiceAccountFile</code>
            </td>
            <td>string</td>
            <td>
              The GCP service account JSON. Pass the file contents to Nebula as
              a secret. See the example below.
            </td>
            <td>None</td>
            <td>True for GCP</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>
              <code>awsAccessKeyID</code>
            </td>
            <td>string</td>
            <td>The AWS access key ID.</td>
            <td>None</td>
            <td>True for AWS</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>
              <code>awsSecretAccessKey</code>
            </td>
            <td>string</td>
            <td>The AWS secret access key.</td>
            <td>None</td>
            <td>True for AWS</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>
              <code>sshPublicKey</code>
            </td>
            <td>string</td>
            <td>
              An SSH public key to install on the virtual machine instances that
              run the cluster.
            </td>
            <td>None</td>
            <td>True for AWS</td>
          </tr>
          <tr>
            <td>
              <code>stateStoreName</code>
            </td>
            <td>&nbsp;</td>
            <td>string</td>
            <td className="increased-min-width">
              A storage bucket name to store cluster state. This configuration
              uses the storage system of your cloud provider. AWS uses s3, GCP
              uses GS. If the bucket exists, the task tries to just use it. If
              the bucket does not exist, the task attempts to create the bucket.
              Multiple clusters can use the same state storage as long as the{' '}
              <code>clusterName</code> values are different.
            </td>
            <td>None</td>
            <td>True</td>
          </tr>
          <tr>
            <td>
              <code>masterCount</code>
            </td>
            <td>&nbsp;</td>
            <td>integer</td>
            <td>A count of how many master nodes to provision.</td>
            <td>1</td>
            <td>False</td>
          </tr>
          <tr>
            <td>
              <code>nodeCount</code>
            </td>
            <td>&nbsp;</td>
            <td>integer</td>
            <td>A count of how many agent nodes to provision.</td>
            <td>3</td>
            <td>False</td>
          </tr>
          <tr>
            <td>
              <code>zones</code>
            </td>
            <td>&nbsp;</td>
            <td>An sequence of strings</td>
            <td>
              An sequence of zones in the cloud platform to run node instances
              in.
            </td>
            <td>None</td>
            <td>True (at least one)</td>
          </tr>
          <tr>
            <td>
              <code>region</code>
            </td>
            <td>&nbsp;</td>
            <td>string</td>
            <td>A platform region to use when provisioning a cluster.</td>
            <td>None</td>
            <td>True</td>
          </tr>
        </tbody>
      </table>
      <blockquote>
        <p>
          <strong>Note</strong>: The value you set for a secret must be a
          string. If you have multiple key-value pairs to pass into the secret,
          or your secret is the contents of a file, you must encode the values
          using base64 encoding, and use the encoded string as the secret value.
        </p>
      </blockquote>
      <h4>Outputs</h4>
      <p>
        After a cluster is provisioned, Nebula stores the{' '}
        <code>kubeconfig</code> file as an output. Other steps in your workflow,
        like Kubectl or Helm can use the output to interact with the cluster.
      </p>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Data type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>kubeconfig-file</code>
            </td>
            <td>string</td>
          </tr>
        </tbody>
      </table>
      <h4>Examples</h4>
      <p>Here is an example of the step in a Nebula workflow:</p>
      <pre>
        <code className="language-YAML">{example1}</code>
      </pre>
      <p>
        Here is an example of how to call the <code>kubeconfig</code> file from
        another step in your workflow:
      </p>
      <pre>
        <code className="language-YAML">{example2}</code>
      </pre>
    </div>
  </div>
</Content>;
```

## Related

- [Content writing](#/Foundations/ContentWriting): guidance and examples for writing content
- [Typography](#/Foundations/Typography): rules and definitions for typefaces and fonts
