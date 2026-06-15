import React, { useEffect, useRef, useState } from 'react';

import { FaPuzzlePiece } from 'react-icons/fa';

import './TowerOfHanoi.css';


export default function TowerOfHanoi() {
  const CANVAS_WIDTH = 800;   // キャンバスの横幅
  const CANVAS_HEIGHT = 600;  // キャンバスの縦幅
  const BAR_NAME = ['START', '', 'GOAL'];  // 棒の名称
  const BAR_WIDTH = 24;    // 棒の横幅
  const BAR_HEIGHT = 360;  // 棒の縦幅
  const STOPPER_WIDTH = 160;  // ストッパの横幅
  const STOPPER_HEIGHT = 64;  // ストッパの縦幅
  const DISK_WIDTH_DIFFERENCE = 24;  // 円盤の横幅の差分
  const DISK_HEIGHT = 32;            // 円盤の縦幅
  const MANUAL = 'manual';  // 手動
  const AUTO = 'auto';      // 自動

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const rectRef = useRef(null);

  const barsRef = useRef([[], [], []]);
  const diskRef = useRef({
    idx: -1,
    x: 0,
    y: 0,
    bar: -1,
    dragging: false
  });

  const answerRef = useRef([]);
  const indexRef = useRef(0);
  const timerRef = useRef(null);
  const operationRef = useRef(MANUAL);

  const [num, setNum] = useState(5);
  const [cnt, setCnt] = useState(0);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.font = '16px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    contextRef.current = context;
    rectRef.current = canvas.getBoundingClientRect();

    init();
  }, []);

  useEffect(() => {
    init();
  }, [num]);

  /**
   * ゲームを初期化する関数
   */
  function init() {
    clearInterval(timerRef.current);

    setCnt(0);
    setMsg('');

    operationRef.current = MANUAL;

    const bars = [[], [], []];
    for (let i = num; i > 0; i--) {
      bars[0].push(i);
    }
    barsRef.current = bars;

    update();
  }

  /**
   * ゲームを描画する関数
   * @param {*} bars 棒
   */
  function draw(bars) {
    const canvas = canvasRef.current;
    const context = contextRef.current;

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 背景の描画
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#000");
    gradient.addColorStop(0.5, "#282c34");
    gradient.addColorStop(1, "#000");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 棒の描画
    for (let i = 0; i < 3; i++) {
      context.fillStyle = '#996633';
      context.fillRect(CANVAS_WIDTH*(2*i + 1)/6 - BAR_WIDTH/2, CANVAS_HEIGHT/2 - BAR_HEIGHT/2, BAR_WIDTH, BAR_HEIGHT);
      context.fillRect(CANVAS_WIDTH*(2*i + 1)/6 - STOPPER_WIDTH/2, CANVAS_HEIGHT/2 + BAR_HEIGHT/2, STOPPER_WIDTH, STOPPER_HEIGHT);
      // 文字の描画
      context.fillStyle = '#fff';
      context.fillText(BAR_NAME[i], CANVAS_WIDTH*(2*i + 1)/6, CANVAS_HEIGHT/2 + BAR_HEIGHT/2 + STOPPER_HEIGHT/2);

      // 円盤の描画
      for (let j = 0; j < bars[i].length; j++) {
        const x = CANVAS_WIDTH*(2*i + 1)/6;
        const y = CANVAS_HEIGHT/2 + BAR_HEIGHT/2 - (j + 1)*DISK_HEIGHT;
        if (diskRef.current.idx !== bars[i][j]) {
          drawDisk(bars[i][j], x, y);
        }
      }
    }
  }

  /**
   * 円盤を描画する関数
   * @param {number} n 円盤の番号
   * @param {number} x キャンバスのｘ座標
   * @param {number} y キャンバスのｙ座標
   */
  function drawDisk(n, x, y) {
    const context = contextRef.current;

    // 円盤の描画
    const w = n*DISK_WIDTH_DIFFERENCE + BAR_WIDTH;
    context.fillStyle = `hsl(${(n - 1) * 40},100%,50%)`;
    context.fillRect(x - w/2, y, w, DISK_HEIGHT);
    // 数字の描画
    context.fillStyle = '#000';
    context.fillText(n, x, y + 16);
  }

  /**
   * ゲームを更新する関数
   */
  function update() {
    const bars = barsRef.current;

    // 描画
    draw(bars);
    if (diskRef.current.idx > -1) {
      drawDisk(diskRef.current.idx, diskRef.current.x, diskRef.current.y);
    }
    if (bars[2].length === num) {
      setMsg('CLEAR!');
    }
  }

  /**
   * 棒を判定して取得する関数
   * @param {number} x キャンバスのｘ座標
   * @param {number} y キャンバスのｙ座標
   * @returns 棒の番号
   */
  function getBar(x, y) {
    if (x > BAR_WIDTH*2 && x < CANVAS_WIDTH/3 - BAR_WIDTH*2 && y > CANVAS_HEIGHT/2 - BAR_HEIGHT/2 && y < CANVAS_HEIGHT/2 + BAR_HEIGHT/2 + STOPPER_HEIGHT) {
      return 0;
    } else if (x > CANVAS_WIDTH/3 + BAR_WIDTH*2 && x < CANVAS_WIDTH*2/3 - BAR_WIDTH*2 && y > CANVAS_HEIGHT/2 - BAR_HEIGHT/2 && y < CANVAS_HEIGHT/2 + BAR_HEIGHT/2 + STOPPER_HEIGHT) {
      return 1;
    } else if (x > CANVAS_WIDTH*2/3 + BAR_WIDTH*2 && x < CANVAS_WIDTH - BAR_WIDTH*2 && y < CANVAS_HEIGHT/2 + BAR_HEIGHT/2 + STOPPER_HEIGHT) {
      return 2;
    }
    return -1;
  }

  /**
   * 円盤の移動開始を処理する関数
   * @param {MouseEvent} e マウスの移動によるイベント
   */
  function startMove(e) {
    const rect = rectRef.current;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const bar = barsRef.current;
    const barIdx = getBar(x, y);

    if (
      barIdx > -1 &&
      bar[barIdx].length > 0 &&
      operationRef.current === MANUAL
    ) {
      const disk = diskRef.current;

      disk.dragging = true;
      disk.idx = bar[barIdx][bar[barIdx].length - 1];
      disk.bar = barIdx;
      disk.x = x;
      disk.y = y;

      update();
    }
  }

  /**
   * マウスの移動を処理する関数
   * @param {MouseEvent} e マウスの移動によるイベント
   */
  function move(e) {
    const disk = diskRef.current;

    if (!disk.dragging) return;

    const rect = rectRef.current;

    disk.x = e.clientX - rect.left;
    disk.y = e.clientY - rect.top;

    update();
  }

  /**
   * マウスの移動終了を処理する関数
   * @param {MouseEvent} e マウスの移動によるイベント
   */
  function endMove(e) {
    const disk = diskRef.current;

    if (!disk.dragging) return;

    disk.dragging = false;

    const rect = rectRef.current;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newBar = getBar(x, y);

    const bar = barsRef.current;

    if (newBar > -1 && disk.idx > -1) {
      if (
        bar[newBar].length === 0 ||
        disk.idx < bar[newBar][bar[newBar].length - 1]
      ) {
        bar[disk.bar].pop();
        bar[newBar].push(disk.idx);

        setCnt(c => c + 1);
      }
    }

    disk.idx = -1;

    update();
  }

  /**
   * 解答を表示する関数
   */
  function showAnswer() {
    init();

    answerRef.current = [];

    hanoi(num, 0, 1, 2);

    indexRef.current = 0;

    operationRef.current = AUTO;

    timerRef.current = setInterval(moveDisk, 500);
  }

  /**
   * 解答する関数
   * @param {number} n 移動する円盤の番号
   * @param {number} from 移動元の棒の番号
   * @param {number} work 作業用の棒の番号
   * @param {number} dest 移動先の棒の番号
   */
  function hanoi(n, from, work, dest) {
    if (n <= 0) return;

    hanoi(n - 1, from, dest, work);

    answerRef.current.push({n, from, dest});

    hanoi(n - 1, work, from, dest);
  }

  /**
   * 円盤を移動する関数
   */
  function moveDisk() {
    const bar = barsRef.current;
    const answer = answerRef.current;

    if (indexRef.current < answer.length) {
      const step = answer[indexRef.current];

      bar[step.from].pop();
      bar[step.dest].push(step.n);

      indexRef.current++;

      setCnt(indexRef.current);

      update();
    } else {
      clearInterval(timerRef.current);
      operationRef.current = MANUAL;
    }
  }

  return (
    <main className="tower-of-hanoi wrapper">
      <h2>
        <FaPuzzlePiece size="1.5em" />&nbsp;ハノイの塔
      </h2>
      <div className="game-contents">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onMouseDown={startMove}
          onMouseMove={move}
          onMouseUp={endMove}
          onMouseLeave={endMove}
        />
        <aside>
          <div className="scores">
            <h3>スコア</h3>
            <ul>
              <li>試行回数：{cnt}</li>
              <li>&gt;&nbsp;<span className="message">{msg}</span></li>
            </ul>
          </div>
          <div className="controls">
            <h3>設定</h3>
            <ul>
              <li>円盤の枚数：<input
                type="number"
                value={num}
                min="3"
                max="9"
                onChange={(e) => setNum(Number(e.target.value))}
              /></li>
              <li><button onClick={showAnswer}>Answer</button></li>
              <li><button onClick={init}>Reset</button></li>
            </ul>
          </div>
        </aside>
        
      </div>
    </main>
  );
}
