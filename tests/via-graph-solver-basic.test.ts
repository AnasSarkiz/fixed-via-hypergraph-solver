import { expect, test } from "bun:test"
import viaTile from "../assets/ViaGraphSolver/via-tile-4-regions.json"
import { getSvgFromGraphicsObject } from "graphics-debug"
import {
  FixedViaHypergraphSolver,
  createViaGraphWithConnections,
  generateViaTopologyRegions,
} from "../lib"

test("FixedViaHypergraphSolver: solves a basic 3-connection perimeter case", () => {
  const baseGraph = generateViaTopologyRegions(viaTile, {
    graphSize: 5,
    idPrefix: "via",
  })

  const graphWithConnections = createViaGraphWithConnections(baseGraph, [
    {
      start: { x: -2.5, y: 1.0 },
      end: { x: 2.5, y: -1.0 },
      connectionId: "A",
    },
    {
      start: { x: 0, y: 2.5 },
      end: { x: -2.5, y: -1.0 },
      connectionId: "B",
    },
    {
      start: { x: 0, y: -2.5 },
      end: { x: 2.5, y: 1.0 },
      connectionId: "C",
    },
  ])

  const solver = new FixedViaHypergraphSolver({
    inputGraph: {
      regions: graphWithConnections.regions,
      ports: graphWithConnections.ports,
    },
    inputConnections: graphWithConnections.connections,
    viaTile,
  })

  solver.solve()

  expect(solver.solved).toBe(true)
  expect(solver.failed).toBe(false)
  expect(solver.solvedRoutes.length).toBe(3)
  expect(getSvgFromGraphicsObject(solver.visualize())).toMatchSvgSnapshot(
    import.meta.path,
  )
})
