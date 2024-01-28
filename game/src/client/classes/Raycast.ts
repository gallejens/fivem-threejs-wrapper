import { Vec3 } from '@shared/types/util';
import { Vector3 } from '../../shared/vector3';

export class Raycast {
  private readonly _hit: boolean;
  private readonly _entity: number | null;
  private readonly _surfaceNormal: Vec3 | null;
  private readonly _coords: Vec3 | null;

  constructor(distance = 25.0, flag = -1, ignore = PlayerPedId()) {
    const cameraCoords = Vector3.create(GetGameplayCamCoord());
    const cameraRotation = Vector3.create(GetGameplayCamRot(0));
    const forwardVector = Raycast.getForwardVector(cameraRotation);
    const forwardCoords = cameraCoords.add(forwardVector.multiply(distance));

    const handle = StartExpensiveSynchronousShapeTestLosProbe(
      cameraCoords.x,
      cameraCoords.y,
      cameraCoords.z,
      forwardCoords.x,
      forwardCoords.y,
      forwardCoords.z,
      flag,
      ignore,
      0
    );
    const [
      _,
      hit,
      [hitCoordX, hitCoordY, hitCoordZ],
      [surfaceNormalX, surfaceNormalY, surfaceNormalZ],
      entityHit,
    ] = GetShapeTestResult(handle);

    this._hit = !!hit;

    if (this._hit) {
      this._coords = { x: hitCoordX, y: hitCoordY, z: hitCoordZ };
      this._surfaceNormal = {
        x: surfaceNormalX,
        y: surfaceNormalY,
        z: surfaceNormalZ,
      };

      if (
        entityHit &&
        DoesEntityExist(entityHit) &&
        GetEntityType(entityHit) !== 0
      ) {
        this._entity = entityHit;
      } else {
        this._entity = null;
      }
    } else {
      this._coords = null;
      this._surfaceNormal = null;
      this._entity = null;
    }
  }

  public get hit() {
    return this._hit;
  }
  public get entity() {
    return this._entity;
  }
  public get coords() {
    return this._coords;
  }
  public get surfaceNormal() {
    return this._surfaceNormal;
  }

  public static getForwardVector(rotation: Vector3) {
    const rotationRadians = rotation.multiply(Math.PI / 180);
    return new Vector3(
      -Math.sin(rotationRadians.z) * Math.abs(Math.cos(rotationRadians.x)),
      Math.cos(rotationRadians.z) * Math.abs(Math.cos(rotationRadians.x)),
      Math.sin(rotationRadians.x)
    );
  }

  public getSurfaceRotation() {
    if (!this.surfaceNormal) throw new Error('No surface normal found');

    const upVector = new Vector3(0, 1, 0);
    const rotationAxis = upVector.crossProduct(this.surfaceNormal).normalize;
    const rotationAngle = Math.acos(upVector.dotProduct(this.surfaceNormal));
    const rotationVector = rotationAxis.multiply(rotationAngle);

    return rotationVector;
  }
}
