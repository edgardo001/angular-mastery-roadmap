import { Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

/**
 * Componente de gráfico de líneas usando D3.js
 *
 * Muestra tendencias a lo largo del tiempo con una línea animada,
 * área degradada debajo y puntos interactivos.
 *
 * Analogía: Es como un EKG de tu negocio — ves la tendencia en tiempo real.
 */
@Component({
  selector: 'app-d3-line-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-container">
      <h3>{{ title }}</h3>
      <div #chart class="chart-area"></div>
    </div>
  `,
  styles: [`
    .chart-container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .chart-area { width: 100%; min-height: 300px; }
    :host ::ng-deep .line { fill: none; stroke: #e94560; stroke-width: 3; }
    :host ::ng-deep .area { fill: url(#gradient); opacity: 0.3; }
    :host ::ng-deep .dot { fill: #e94560; stroke: white; stroke-width: 2; }
    :host ::ng-deep .axis text { fill: #333; font-size: 12px; }
    :host ::ng-deep .axis line, :host ::ng-deep .axis path { stroke: #ccc; }
    :host ::ng-deep .grid line { stroke: #eee; }
    :host ::ng-deep .grid path { display: none; }
  `],
})
export class D3LineChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  @Input() data: { month: string; value: number }[] = [];
  @Input() title = 'Gráfico de Líneas D3';

  private resizeObserver: ResizeObserver;

  constructor() {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.data.length > 0) this.createChart();
    });
  }

  ngAfterViewInit() {
    this.resizeObserver.observe(this.chartContainer.nativeElement);
    if (this.data.length > 0) this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.chartContainer) this.createChart();
  }

  ngOnDestroy() { this.resizeObserver.disconnect(); }

  private createChart() {
    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = element.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Gradiente: degradado vertical para el área bajo la línea
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#e94560').attr('stop-opacity', 0.8);
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#e94560').attr('stop-opacity', 0);

    // Escalas
    const x = d3.scalePoint()
      .domain(this.data.map(d => d.month))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d.value) || 0])
      .nice()
      .range([height, 0]);

    svg.append('g').attr('class', 'axis').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
    svg.append('g').attr('class', 'axis').call(d3.axisLeft(y));
    svg.append('g').attr('class', 'grid').call(d3.axisLeft(y).tickSize(-width).tickFormat(''));

    // Área bajo la línea
    const area = d3.area<any>()
      .x((d) => x(d.month)!)
      .y0(height)
      .y1((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(this.data)
      .attr('class', 'area')
      .attr('d', area);

    // Línea principal
    const line = d3.line<any>()
      .x((d) => x(d.month)!)
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    const path = svg.append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('d', line);

    // Animación de la línea: se dibuja de izquierda a derecha
    const totalLength = path.node().getTotalLength();
    path
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(1500)
      .ease(d3.easeQuadOut)
      .attr('stroke-dashoffset', 0);

    // Puntos circulares en cada dato
    svg.selectAll('.dot')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => x(d.month)!)
      .attr('cy', (d) => y(d.value))
      .attr('r', 0)
      .transition()
      .delay((d, i) => 1500 + i * 100)
      .duration(300)
      .attr('r', 5);
  }
}
