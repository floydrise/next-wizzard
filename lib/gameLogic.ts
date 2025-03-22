import {
  AnchorComp,
  AreaComp,
  BodyComp,
  GameObj,
  KAPLAYCtx,
  PosComp,
  ScaleComp,
  SpriteComp,
  Vec2,
} from "kaplay";

export const playerMovementAnimation = (
  k: KAPLAYCtx,
  player: GameObj<
    | PosComp
    | SpriteComp
    | ScaleComp
    | BodyComp
    | AreaComp
    | AnchorComp
    | {
        direction: Vec2;
        speed: number;
      }
  >,
) => {
  player.onUpdate(() => {
    player.direction.x = 0;
    player.direction.y = 0;

    if (k.isKeyDown("left")) player.direction.x = -1;
    if (k.isKeyDown("right")) player.direction.x = 1;
    if (k.isKeyDown("up")) player.direction.y = -1;
    if (k.isKeyDown("down")) player.direction.y = 1;

    if (
      player.direction.eq(k.vec2(-1, 0)) &&
      player.getCurAnim()?.name !== "run"
    ) {
      player.play("run");
    }

    if (
      player.direction.eq(k.vec2(1, 0)) &&
      player.getCurAnim()?.name !== "run"
    ) {
      player.play("run");
    }

    if (
      player.direction.eq(k.vec2(0, -1)) &&
      player.getCurAnim()?.name !== "run"
    ) {
      player.play("run");
    }

    if (
      player.direction.eq(k.vec2(0, 1)) &&
      player.getCurAnim()?.name !== "run"
    ) {
      player.play("run");
    }

    if (
      player.direction.eq(k.vec2(0, 0)) &&
      player.getCurAnim()?.name !== "idle"
    ) {
      player.play("idle");
    }
  });
};

export const playerMovementLogic = (
  k: KAPLAYCtx,
  player: GameObj<
    | PosComp
    | SpriteComp
    | ScaleComp
    | BodyComp
    | AreaComp
    | AnchorComp
    | {
        direction: Vec2;
        speed: number;
      }
  >,
) => {
  k.onKeyDown("left", () => {
    player.flipX = true;
    player.move(-player.speed, 0);
    if (player.pos.x <= 32) player.pos.x = 32;
  });

  k.onKeyDown("right", () => {
    player.flipX = false;
    player.move(player.speed, 0);
    if (player.pos.x >= 1280 - 32) player.pos.x = 1280 - 32;
  });

  k.onKeyDown("up", () => {
    player.move(0, -player.speed);
    if (player.pos.y <= 96) player.pos.y = 96;
  });

  k.onKeyDown("down", () => {
    player.move(0, player.speed);
    if (player.pos.y >= 720 - 64) player.pos.y = 720 - 64;
  });

  k.onKeyPress("left", () => {
    k.play("walk", { volume: 0.5 });
  });

  k.onKeyPress("right", () => {
    k.play("walk", { volume: 0.5 });
  });

  k.onKeyPress("up", () => {
    k.play("walk", { volume: 0.5 });
  });

  k.onKeyPress("down", () => {
    k.play("walk", { volume: 0.5 });
  });
};
