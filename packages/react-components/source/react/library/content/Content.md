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
          href="https://github.com/puppetlabs/relay-workflow-examples/tree/master/example-workflows/gke-provision-and-deploy-workflow"
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
            <a href="/documentation/step-specifications">Step specifications</a>
            .
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
import Heading from '../heading'
import Code from '../code';
import Text from '../text';
import Link from '../link';

const exampleCode1 = `# This example uses a plain <code> tag inside a <pre> tag:

begin
  require "puppet/util/command_line";
  Puppet::Util::CommandLine.new.execute
rescue LoadError => e
  $stderr.puts e.message
  exit(1)
end`;

const exampleCode2 = `# This example uses a PDS Code component with type="block":

cron { "logrotate":
  command => "/usr/sbin/logrotate",
  user    => "root",
  hour    => 2,
  minute  => 0,
}`;

const exampleCode3 = `# This example uses a PDS Code component with type="block":

exec { "tar -xf /Volumes/nfs02/important.tar":
  cwd     => "/var/tmp",
  creates => "/var/tmp/myfile",
  path    => ["/usr/bin", "/usr/sbin",],
}`;

<Content>
  <Heading as='hero'>Hero Heading</Heading>

  <h1>
    Heading 1 <a href="#">vis</a> vitae <Code size="large">apeirian</Code> atomorum
  </h1>

  <p>
    Default body text: Offendit conceptam inciderint per at!{' '}
    <a href="#">
      Link with <Code>&lt;a&gt;</Code> tag
    </a>{' '}
    hinc eius et duo,{' '}
    <Link href="#">
      Link with <Code>Link</Code> component
    </Link>{' '}
    duo prima delenit atomorum ad, ei sed maluisset principes? Ne honestatis
    intellegebat mea. Id sed idque commune, <code>inline &lt;code&gt; tag</code>{' '}
    doming <Code>inline Code component</Code> complectitur, nam te illum
    invidunt facilisis.
  </p>

  <Text size="large" color="subtle">
    <Code size="large">Text</Code> component with size <Code size="large">large</Code>:
    Rebum vivendo eu sit. Cu vide homero pri, atqui legere ut eos. Usu solet tamquam
    apeirian ne, utinam laboramus ea vix, pri at luptatum interesset conclusionemque.
    An usu mundi neglegentur, vix ne cetero omittam, usu meliore laboramus et.
  </Text>

  <p>
    Tritani nonumes cu quo. Vis ne officiis expetendis, nec et prima prompta
    principes, vidit falli nonumes an eum. Ei mei autem elitr, ex nusquam
    dissentias eam, cu semper persius sententiae per.
  </p>

  <Text size="medium" color="medium">
    <Code size="medium">Text</Code> component with size <Code size="medium">medium</Code>: Qui alia lobortis
    in. Eum in dictas scribentur, mucius suscipit tincidunt vix eu, ut nostrud
    docendi usu.
  </Text>

  <p>
    Te mel dicat posidonium. Mei <Code>pertinax</Code> mandamus in. Tota vidit vim et, eos at
    fugit facete! Salutandi <code>maiestatis</code> cum at, te esse nemore intellegat eos, ei
    mel numquam inciderint?
  </p>

  <Text size="small" color="success">
    <Code size="small">Text</Code> component with size <Code size="small">small</Code>: Eu qui modo nihil,
    eu rebum scaevola cum, te ridens delicata nam. Et ius vero inani omittam, at
    phaedrum hendrerit quo.
  </Text>

  <p>
    Eu ius minim graeco debitis, vel te iudico omnium torquatos, per purto errem
    repudiandae ne. Te viris vocibus invidunt eam, pro ex iisque facilis
    constituto.
  </p>

  <Text size="tiny" color="danger">
    <Code size="tiny">Text</Code> component with size <Code size="tiny">tiny</Code>: Denique maiestatis
    adversarium id qui, et vel lorem tation legere. Eu ius minim graeco debitis,
    vel te iudico omnium torquatos, per purto errem repudiandae ne.
  </Text>

  <p>
    Consul quaerendum adversarium sed in, nostrum laboramus persecuti quo ea. At
    pro regione tacimates sadipscing, has at errem scriptorem, mei honestatis
    omittantur ad.
  </p>

  <blockquote>
    <p>
      Blockquote quo ne saepe decore <a href="#">scripserit</a>. Nec{' '}
      <Code size='small'>mazim liberavisse</Code> ut, eos scripta sanctus adipiscing et, te
      everti vivendo accusam vix.
    </p>
  </blockquote>

  <p>
    Cu ludus putent eleifend qui, lorem dicant tamquam no eam. Quo ne sanctus
    constituam theophrastus, alia simul vix no. No oportere mediocrem omittantur
    usu.
  </p>

  <pre>
    <code className="lang-ruby">{exampleCode1} </code>
  </pre>

  <p>
    Qui lucilius scripserit interesset et. Everti causae eos ad. At per duis
    comprehensam, in vel eruditi detracto constituam. Vel alterum theophrastus
    in, nec ad esse ubique menandri, est case dolorem in. Essent similique
    dissentias quo in, vis et mentitum atomorum!
  </p>

  <Code type="block">{exampleCode2}</Code>

  <h2>
    Heading 2 mei no diceret <Code size='large'>detraxit</Code> splendide
  </h2>

  <p>Case doctus splendide sed ex:</p>

  <ul>
    <li>
      Ex vel posse disputando. Per suscipit eleifend te, ad atqui legimus
      suavitate sed, saepe denique te vix? Luptatum scribentur cotidieque mel
      eu, eum delenit eligendi appetere eu.
    </li>
    <li>
      Qui nobis molestie epicurei ad
      <ul>
        <li>
          Per habeo numquam ne. In vis constituam scriptorem! Ea per quidam
          aliquam accusam.
        </li>
        <li>
          Ludus reprimique vel et, quo ei oporteat probatus
          <ul>
            <li>
              Per habeo numquam ne. In vis constituam scriptorem! Ea per quidam
              aliquam accusam.
            </li>
            <li>Ludus reprimique vel et, quo ei oporteat probatus</li>
          </ul>
        </li>
        <li>
          Ritani nonumes cu quo.
          <blockquote>
            Modus epicuri evertitur ad nec, vim dicta partem prodesset an?
            Commune salutandi efficiendi per no, eu vel atqui iuvaret
            definiebas? Vel ad appetere interpretaris, pro ei persius
            omittantur.
          </blockquote>
        </li>
      </ul>
    </li>
    <li>
      In sit ludus omnium corpora
      <ol>
        <li>
          Per habeo numquam ne. In vis constituam scriptorem! Ea per quidam
          aliquam accusam.
        </li>
        <li>
          Ludus reprimique vel et, quo ei oporteat probatus
          <Code type="block">{exampleCode3}</Code>
        </li>
      </ol>
    </li>
    <li>An eam erat zril everti, eum no oporteat voluptaria</li>
  </ul>

  <p>
    Ei pro insolens accusamus, id mea quodsi omnium philosophia? Eu agam liber
    eripuit usu? His at ullum adipiscing assueverit, quo dolor ubique in. Pro te
    libris theophrastus, primis oporteat et cum.
  </p>

  <ol>
    <li>Mutat noluisse pericula eos an</li>
    <li>
      Latine eloquentiam appellantur sed ea
      <ol>
        <li>
          Esse concludaturque mei ad. Has mazim admodum theophrastus an, est
          mollis aperiam nominavi id. Ad zril offendit intellegat pri, id quo
          officiis apeirian.
        </li>
        <li>
          Cu purto omnesque signiferumque nec
          <ol>
            <li>
              Esse concludaturque mei ad. Has mazim admodum theophrastus an, est
              mollis aperiam nominavi id. Ad zril offendit intellegat pri, id
              quo officiis apeirian.
            </li>
            <li>Cu purto omnesque signiferumque nec</li>
          </ol>
        </li>
      </ol>
    </li>
    <li>Eum maiorum persequeris consequuntur</li>
    <li>
      Dicat accumsan ne mei
      <ul>
        <li>Ei eam vero meis omnium</li>
        <li>
          Per habeo numquam ne, ludus reprimique vel et, quo ei oporteat
          probatus. Et labore equidem constituto vel, mea cu nonumes verterem
          referrentur.
        </li>
      </ul>
    </li>
    <li>An eam erat zril everti, eum no oporteat voluptaria</li>
  </ol>

  <p>
    Ea, sea ex duis ceteros forensibus! Per eros tollit et. Graece verear
    periculis eos ea, nusquam appetere constituam ne mel, eius natum intellegat
    eos eu! Enim facilisis accommodare ne sea, ei sea veri vocent iuvaret.
  </p>

  <h3>
    Heading 3 an quo clita <Code size='large'>gubergren</Code> assentior
  </h3>

  <p>Quo veniam saperet mnesarchum ut, no dolor volutpat assueverit per</p>

  <h4>
    Heading 4 pro no verear <Code size='medium'>integre</Code> albucius
  </h4>

  <p>
    Modus epicuri evertitur ad nec, vim dicta partem prodesset an? Commune
    salutandi efficiendi per no, eu vel atqui iuvaret definiebas? Vel ad
    appetere interpretaris, pro ei persius omittantur. Has justo veniam corpora
    eu! Ne assum partem posidonium cum.
  </p>

  <h5>
    Heading 5 ad zril iudico <Code>corrumpit</Code> ius
  </h5>

  <p>
    Bonorum evertitur an mea, ex duo exerci ridens bonorum, ad vel facer
    postulant. Enim laudem suavitate has eu, brute fabellas forensibus cu sed,
    an duo solet dicant aperiri! Te utinam intellegam est, sed cu impetus
    maiestatis neglegentur, cu duis recteque his.
  </p>

  <h6>
    Heading 6 in pri <Code size='small'>appareat</Code> abhorreant
  </h6>

  <p>
    Tale purto singulis quo an, prima utinam volumus ex eum, vim ex mucius
    evertitur! Veniam tincidunt mel te, id est oportere tincidunt. Ius ex hinc
    aperiam. Est ad malis dolores definitionem, habeo voluptatum at usu, altera
    efficiantur cum te. Ut aliquid omnesque his, ei euripidis voluptatum
    definiebas qui.
  </p>

  <p>
    <strong>Example table:</strong>
  </p>

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
        <td />
        <td>string</td>
        <td>
          The cloud provider to use. Use <code>aws</code> or <code>gcp</code>.
        </td>
        <td>None</td>
        <td>True</td>
      </tr>
      <tr>
        <td>
          <code>project</code>
        </td>
        <td />
        <td>string The GCP project ID.</td>
        <td>None</td>
        <td>True for GCP</td>
        <td />
      </tr>
      <tr>
        <td>
          <code>credentials</code>
        </td>
        <td />
        <td>mapping</td>
        <td>A map of credentials used for platform authentication.</td>
        <td>None</td>
        <td>True</td>
      </tr>
      <tr>
        <td />
        <td>
          <code>gcpServiceAccountFile</code>
        </td>
        <td>string</td>
        <td>
          The GCP service account JSON. Pass the file contents to Nebula as a
          secret. See the example below.
        </td>
        <td>None</td>
        <td>True for GCP</td>
      </tr>
      <tr>
        <td />
        <td>
          <code>awsAccessKeyID</code>
        </td>
        <td>string</td>
        <td>The AWS access key ID.</td>
        <td>None</td>
        <td>True for AWS</td>
      </tr>
      <tr>
        <td />
        <td>
          <code>awsSecretAccessKey</code>
        </td>
        <td>string</td>
        <td>The AWS secret access key.</td>
        <td>None</td>
        <td>True for AWS</td>
      </tr>
      <tr>
        <td />
        <td>
          <code>sshPublicKey</code>
        </td>
        <td>string</td>
        <td>
          An SSH public key to install on the virtual machine instances that run
          the cluster.
        </td>
        <td>None</td>
        <td>True for AWS</td>
      </tr>
      <tr>
        <td>
          <code>masterCount</code>
        </td>
        <td />
        <td>integer</td>
        <td>A count of how many master nodes to provision.</td>
        <td>1</td>
        <td>False</td>
      </tr>
    </tbody>
  </table>
</Content>;
```

## Related

- [Content writing](#/Foundations/ContentWriting): guidance and examples for writing content
- [Typography](#/Foundations/Typography): rules and definitions for typefaces and fonts
