name 'guardian'
maintainer 'Rapid7, LLC'
maintainer_email 'engineringservices@rapid7.com'
description 'Installs/Configures guardian'

license 'MIT'
long_description IO.read(File.expand_path('../../README.md', __FILE__)) rescue ''
version IO.read(File.expand_path('../../VERSION', __FILE__)) rescue '0.0.1'

depends 'apt'
depends 'etcd-v2', '~> 1.0'
depends 'libarchive', '>= 0.5.0'
depends 'nodejs'

supports 'ubuntu'
