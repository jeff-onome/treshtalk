
import React from 'react';

const InstallationPage: React.FC = () => {
    const codeSnippet = `<!-- Treshchat Installation -->
<script>
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://cdn.treshchat.com/widget.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'treshchat-widget'));
  window.treshchat = {
    id: "YOUR_UNIQUE_ID"
  };
</script>
<!-- End Treshchat Installation -->`;

    return (
        <div className="bg-white rounded-lg shadow p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-dark mb-4">Installation Guide</h1>
            <p className="text-gray-600 mb-6">To add the Treshchat widget to your website, copy and paste the following code snippet into the <code className="bg-gray-200 text-red-600 px-1 rounded">&lt;head&gt;</code> or <code className="bg-gray-200 text-red-600 px-1 rounded">&lt;body&gt;</code> section of your HTML file.</p>
            
            <div className="bg-gray-900 rounded-lg p-4">
                <pre>
                    <code className="text-white text-sm">
                        {codeSnippet}
                    </code>
                </pre>
            </div>

            <p className="mt-6 text-gray-600">
                Make sure to replace <code className="bg-gray-200 text-red-600 px-1 rounded">YOUR_UNIQUE_ID</code> with your actual workspace ID, which can be found in your account settings.
            </p>
        </div>
    );
};

export default InstallationPage;
