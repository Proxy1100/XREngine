/** Network Message Types. */
export enum MessageTypes {
  Heartbeat = 0,
  ClientConnected = 1,
  ClientDisconnected = 2,
  Initialization = 3,
  JoinWorld = 4,
  LeaveWorld = 5,
  WebRTCTransportCreate = 6,
  WebRTCTransportConnect = 7,
  WebRTCTransportClose = 8,
  WebRTCSendTrack = 9,
  WebRTCReceiveTrack = 10,
  WebRTCPauseConsumer = 11,
  WebRTCResumeConsumer = 12,
  WebRTCCloseConsumer = 13,
  WebRTCPauseProducer = 14,
  WebRTCResumeProducer = 15,
  WebRTCCloseProducer = 16,
  WebRTCMuteOtherProducer = 17,
  WebRTCUnmuteOtherProducer = 18,
  WebRTCConsumerSetLayers = 19,
  WebRTCConsumeData = 20,
  WebRTCProduceData = 21,
  ReliableMessage = 22,
  WebRTCCreateProducer = 23,
  Authorization = 24,
  Kick = 26,
  Ban = 27,
  ConnectToWorld = 28,
  WebRTCRequestCurrentProducers = 29,
  Synchronization = 100,
  ClientInput = 101,
  StateUpdate = 102,
  Test = 250
}
