DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
rm -rf "$DIR/styleguide/images"
$(mdfind kMDItemCFBundleIdentifier == 'com.bohemiancoding.sketch3' | head -n 1)/Contents/Resources/sketchtool/bin/sketchtool export artboards "$DIR/puppet-styleguide.sketch" --output="$DIR/styleguide/images" --scales=2