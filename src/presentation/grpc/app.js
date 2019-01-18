import grpc from 'grpc'
import { loadSync } from '@grpc/proto-loader'
import { resolve as resolvePath } from 'path'

const PROTO_PATH = resolvePath('src/presentation/grpc/proto/blacklist.proto')
// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = loadSync(
  PROTO_PATH,
  {
    // keepCase: true,
    // longs: String,
    // enums: String,
    // defaults: true,
    // oneofs: true
  }
)
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
// The protoDescriptor object has the full package hierarchy
export default protoDescriptor
