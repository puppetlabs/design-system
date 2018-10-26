# Puppet Styleguide

You can export puppet-styleguide.sketch and update the PNGs in this repository by:

1. Installing [SketchTool](https://developer.sketchapp.com/guides/sketchtool/)
2. Running the following command

    ```sh
    $(mdfind kMDItemCFBundleIdentifier == 'com.bohemiancoding.sketch3' | head -n 1)/Contents/Resources/sketchtool/bin/sketchtool export artboards puppet-styleguide.sketch --output=images --scales=2
    ```