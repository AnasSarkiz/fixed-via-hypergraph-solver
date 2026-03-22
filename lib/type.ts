import type {
  Candidate as HyperCandidate,
  Connection as HyperConnection,
  HyperGraph as HyperHyperGraph,
  Region as HyperRegion,
  RegionPort as HyperRegionPort,
  RegionPortAssignment as HyperRegionPortAssignment,
  SerializedConnection as HyperSerializedConnection,
  SerializedHyperGraph as HyperSerializedHyperGraph,
  SolvedRoute as HyperSolvedRoute,
} from "@tscircuit/hypergraph"

export type Connection = HyperConnection
export type HyperGraph = HyperHyperGraph
export type Region = HyperRegion
export type RegionPort = HyperRegionPort
export type RegionPortAssignment = HyperRegionPortAssignment
export type SerializedConnection = HyperSerializedConnection
export type SerializedHyperGraph = HyperSerializedHyperGraph
export type SolvedRoute = HyperSolvedRoute

export type Candidate<
  RegionType extends Region = Region,
  RegionPortType extends RegionPort = RegionPort,
> = HyperCandidate<RegionType, RegionPortType>

export type Bounds = {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

export interface JRegion extends Region {
  d: {
    bounds: Bounds
    center: { x: number; y: number }
    polygon?: { x: number; y: number }[]
    polygonPerimeterCache?: {
      edgeLengths: number[]
      cumulative: number[]
      perimeter: number
    }
    isPad: boolean
    isThroughJumper?: boolean
    isConnectionRegion?: boolean
    isViaRegion?: boolean
  }
}

export interface JPort extends RegionPort {
  region1T?: number
  region2T?: number
  d: {
    x: number
    y: number
  }
}

export type ViaRegionGraph = {
  regions: JRegion[]
  ports: JPort[]
}

// Backward-compat graph shape alias used by migrated via helpers.
export type ViaGraph = ViaRegionGraph

export type XYConnection = {
  start: { x: number; y: number }
  end: { x: number; y: number }
  connectionId: string
}

export type ViaData = {
  viaId: string
  diameter: number
  position: { x: number; y: number }
}

export type RouteSegment = {
  routeId: string
  fromPort: ViaData["viaId"]
  toPort: ViaData["viaId"]
  layer: string
  segments: Array<{ x: number; y: number }>
}

export type ViaByNet = Record<string, ViaData[]>

export type ViaTile = {
  viasByNet: ViaByNet
  routeSegments: RouteSegment[]
  tileWidth?: number
  tileHeight?: number
}
