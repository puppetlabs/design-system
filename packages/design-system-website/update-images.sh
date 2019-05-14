DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
rm -rf "$DIR/src/client/images"
$(mdfind kMDItemCFBundleIdentifier == 'com.bohemiancoding.sketch3' | head -n 1)/Contents/Resources/sketchtool/bin/sketchtool export artboards "$DIR/../design-assets/puppet-styleguide.sketch" --output="$DIR/src/client/images" --scales=2